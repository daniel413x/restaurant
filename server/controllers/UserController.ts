import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import ApiError from '../error/ApiError';
import { IUser } from '../types/types';
import { ADMIN, REGISTERED } from '../utils/consts';
import Cart from '../db/models/Cart';
import AddressInAddressBook from '../db/models/AddressInAddressBook';
import User from '../db/models/User';
import FoodItemInCart from '../db/models/FoodItemInCart';

const generateJwt = ({
  id,
  email,
  roles,
  avatar,
}: IUser) => jwt.sign(
  {
    id,
    email,
    roles,
    avatar,
  },
  process.env.S_KEY!,
  {
    expiresIn: '24h',
  },
);

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const {
      email,
      password,
    } = req.body;
    const incompleteForm = !email || !password;
    if (incompleteForm) {
      return next(ApiError.badRequest('Incomplete form'));
    }
    const formattedEmail = ['', ''];
    email.split('@').forEach((p: string, i: number) => {
      formattedEmail[i] = p;
    });
    const [local, domain] = formattedEmail;
    const expectedLength = formattedEmail.length === 2;
    const validEmail = expectedLength && local && domain;
    if (!validEmail) {
      return next(ApiError.badRequest('Invalid email format'));
    }
    const validPassword = /(?=^\S{6,256}$)^.+$/i.test(password);
    if (!validPassword) {
      return next(ApiError.badRequest('Invalid password'));
    }
    const emailTaken = await User.findOne({ where: { email } });
    if (emailTaken) {
      return next(ApiError.conflict('Account with that email already exists'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      password: hashPassword,
      roles: [REGISTERED, ADMIN],
    });
    const UserId = user.id;
    await Cart.create({ UserId });
    const cart = await Cart.findOne({
      where: {
        UserId,
      },
      include: {
        model: FoodItemInCart,
        as: 'foodItems',
      },
    });
    const token = generateJwt(user);
    return res.json({ token, cart });
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const {
      email,
      password: reqPassword,
    } = req.body;
    const user: IUser | null = await User.findOne({
      where: {
        email,
      },
      include: [{
        model: Cart,
      },
      {
        model: AddressInAddressBook,
        as: 'addresses',
      }],
    });
    if (!user) {
      return next(ApiError.internal('Username/email not found'));
    }
    const userPassword = user.password;
    const comparePassword = bcrypt.compareSync(
      reqPassword,
      userPassword,
    );
    if (!comparePassword) {
      return next(ApiError.internal('Incorrect password'));
    }
    const token = generateJwt(user);
    return res.json({ token });
  }

  async auth(req: Request, res: Response) {
    const { user } = res.locals;
    const token = generateJwt(user);
    return res.json({ token });
  }

  async edit(req: Request, res: Response) {
    const { id } = res.locals.user;
    const updatedVals = req.body;
    if ('password' in updatedVals) {
      const hashPassword = await bcrypt.hash(updatedVals.password, 5);
      updatedVals.password = hashPassword;
    }
    if (req.files) {
      const filesKeys = Object.keys(req.files);
      for (let k = 0; k < filesKeys.length; k += 1) {
        if (/img/.test(filesKeys[k])) {
          const imgProperty = filesKeys[k].substring(3).replace(/^\D/, (c) => c.toLowerCase());
          const fileName = `${uuidv4()}.jpg`;
          updatedVals[imgProperty] = fileName;
          const img = req.files[filesKeys[k]] as UploadedFile;
          img.mv(path.resolve(__dirname, '..', 'static', fileName));
          break;
        }
      }
    }
    const updatedObj = await User.update(updatedVals, { where: { id }, returning: true });
    const token = generateJwt(updatedObj[1][0]);
    return res.json({ token });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    return res.status(204).end();
  }
}

export default new UserController();

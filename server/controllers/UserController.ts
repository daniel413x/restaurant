import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import ApiError from '../error/ApiError';
import { IUser } from '../types/types';
import { GUEST, REGISTERED } from '../utils/consts';
import Cart from '../db/models/Cart';
import AddressInAddressBook from '../db/models/AddressInAddressBook';
import User from '../db/models/User';
import FoodItemInCart from '../db/models/FoodItemInCart';
import BaseController from './BaseController';
import { assignBodyAndProcessImages } from '../utils/functions';
import { sequelize } from '../db';

const generateJwt = ({
  id,
  email,
  roles,
  avatar,
}: any, expiresIn?: string) => jwt.sign(
  {
    id,
    email,
    roles,
    avatar,
  },
  process.env.S_KEY!,
  {
    expiresIn,
  },
);

class UserController extends BaseController<User> {
  constructor() {
    super(User);
  }

  private async validateForm(req: Request): Promise<void> {
    const {
      email,
      password,
    } = req.body;
    const incompleteForm = !email || !password;
    if (incompleteForm) {
      throw ApiError.badRequest('Incomplete form');
    }
    const formattedEmail = ['', ''];
    email.split('@').forEach((p: string, i: number) => {
      formattedEmail[i] = p;
    });
    const [local, domain] = formattedEmail;
    const expectedLength = formattedEmail.length === 2;
    const validEmail = expectedLength && local && domain;
    if (!validEmail) {
      throw ApiError.badRequest('Invalid email format');
    }
    const validPassword = /(?=^\S{6,256}$)^.+$/i.test(password);
    if (!validPassword) {
      throw ApiError.badRequest('Invalid password');
    }
    const emailTaken = await User.findOne({ where: { email } });
    if (emailTaken) {
      throw ApiError.conflict('Account with that email already exists');
    }
  }

  async registration(req: Request, res: Response) {
    const {
      email,
      password,
      guest,
    } = req.body;
    let form: IUser;
    if (guest) {
      const guestId = uuidv4();
      form = {
        id: guestId,
        email: `${guestId}@restaurant.com`,
        password: await bcrypt.hash(uuidv4(), 5),
        roles: [GUEST],
      };
    } else {
      await this.validateForm(req);
      form = {
        id: uuidv4(),
        email,
        password: await bcrypt.hash(password, 5),
        roles: [REGISTERED],
      };
    }
    let user: User;
    let cart: Cart;
    await sequelize.transaction(async (transaction) => {
      user = await User.create(form, { transaction });
      const UserId = user.id;
      cart = await Cart.create({ UserId }, { transaction });
      cart = await Cart.findOne({
        where: {
          UserId,
        },
        include: {
          model: FoodItemInCart,
          as: 'foodItems',
        },
        transaction,
      });
    });
    const token = generateJwt(user, '24h');
    return res.json({ token, cart });
  }

  async registrationGuest(req: Request, res: Response) {
    // occurs for a user whose only role is "GUEST" e.g. one who was registered automatically by adding an item to the cart
    await this.validateForm(req);
    const {
      email,
      password,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 5);
    const { id } = res.locals.user;
    const updatedObj = await User.update({
      email,
      password: hashPassword,
      roles: [REGISTERED],
    }, { where: { id }, returning: true });
    const token = generateJwt(updatedObj[1][0], '24h');
    return res.json({ token });
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const {
      email,
      password: reqPassword,
      guestItems,
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
    // guest-added item accreditations
    if (guestItems?.length > 0) {
      const cart = await Cart.findOne({
        where: {
          UserId: user.id,
        },
      });
      await Promise.all(guestItems.map(async ({ id }) => {
        await FoodItemInCart.update({
          CartId: cart.id,
        }, { where: { id } });
      }));
    }
    const token = generateJwt(user, '24h');
    return res.json({ token });
  }

  async auth(req: Request, res: Response) {
    const { user } = res.locals;
    const token = generateJwt(user, '24h');
    return res.json({ token });
  }

  async edit(req: Request, res: Response) {
    let updatedVals;
    if (req.files) {
      updatedVals = assignBodyAndProcessImages(req);
    } else {
      updatedVals = req.body;
    }
    if ('password' in updatedVals) {
      const hashPassword = await bcrypt.hash(updatedVals.password, 5);
      updatedVals.password = hashPassword;
    }
    const { id } = res.locals.user;
    const updatedObj = await User.update(updatedVals, { where: { id }, returning: true });
    const token = generateJwt(updatedObj[1][0], '24h');
    return res.json({ token });
  }

  async delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new UserController();

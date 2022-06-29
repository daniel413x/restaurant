import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';
import { IUser } from '../types/types';
import { ADMIN } from '../utils/consts';
import Cart from '../db/models/Cart';
import User from '../db/models/User';

const generateJwt = (id: string, email: string, role: string) => jwt.sign(
  {
    id,
    email,
    role,
  },
  process.env.S_KEY!,
  {
    expiresIn: '24h',
  },
);

class UserController {
  constuctor() {
    this.registration = this.registration.bind(this);
    this.login = this.login.bind(this);
    this.auth = this.auth.bind(this);
  }

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
      role: ADMIN,
    });
    await Cart.create({ UserId: user.id });
    const token = generateJwt(
      user.id,
      user.email,
      user.role,
    );
    return res.json({ token });
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
      include: {
        model: Cart,
      },
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
    const token = generateJwt(
      user.id,
      user.email,
      user.role,
    );
    return res.json({ token });
  }

  async auth(req: Request, res: Response) {
    const {
      id,
      email,
      role,
    } = res.locals.user!;
    const token = generateJwt(
      id,
      email,
      role,
    );
    return res.json({ token });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    return res.status(204).end();
  }
}

export default new UserController();

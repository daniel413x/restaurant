import { Request, Response } from 'express';
import FoodItemInCart from '../db/models/FoodItemInCart';
import Cart from '../db/models/Cart';
import BaseController from './BaseController';

class CartController extends BaseController<Cart> {
  constructor() {
    super(Cart);
  }

  async get(req: Request, res: Response) {
    const { id } = res.locals.user;
    const cart = await Cart.findOne({
      where: {
        UserId: id,
      },
      include: {
        model: FoodItemInCart,
        as: 'foodItems',
      },
    });
    return res.json(cart);
  }
}

export default new CartController();

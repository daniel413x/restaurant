import { Request, Response } from 'express';
import Category from '../db/models/Category';
import FoodItemInCart from '../db/models/FoodItemInCart';
import Cart from '../db/models/Cart';

class CartController {
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

  async addItem(req: Request, res: Response) {
    const {
      name,
      price,
      time,
      CartId,
      ingredients,
      instructions,
      quantity,
    } = req.body;
    const cartFoodItem = await FoodItemInCart.create({
      name,
      price,
      time,
      CartId,
      ingredients,
      instructions,
      quantity,
    });
    return res.json(cartFoodItem);
  }

  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const updatedVals = req.body;
    await Cart.update(updatedVals, { where: { id } });
    return res.status(204).end();
  }

  async editItemQuantity(req: Request, res: Response) {
    const { id } = req.params;
    const { quantity } = req.body;
    await FoodItemInCart.update({ quantity }, { where: { id } });
    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await Category.destroy({ where: { id } });
    return res.status(204).end();
  }
}

export default new CartController();

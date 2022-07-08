import { Request, Response } from 'express';
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
      discount,
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
      discount,
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
    let { quantity } = req.body;
    const { increment } = req.body;
    if (increment) {
      quantity += 1;
    } else {
      quantity -= 1;
    }
    await FoodItemInCart.update({ quantity }, { where: { id } });
    return res.status(204).end();
  }

  async deleteItem(req: Request, res: Response) {
    const { id } = req.params;
    await FoodItemInCart.destroy({ where: { id } });
    return res.status(204).end();
  }
}

export default new CartController();

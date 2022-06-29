import { Request, Response } from 'express';
import FoodItemInMenu from '../db/models/FoodItemInMenu';

class FoodItemController {
  async create(req: Request, res: Response) {
    const {
      name,
      discount,
      price,
      image,
      ingredients,
      serves,
      time,
      CategoryId,
    } = req.body;
    const foodItem = await FoodItemInMenu.create({
      name,
      discount,
      price,
      image,
      ingredients,
      serves,
      time,
      CategoryId,
    });
    return res.json(foodItem);
  }

  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      discount,
      price,
      image,
      ingredients,
      serves,
      time,
      CategoryId,
    } = req.body;
    await FoodItemInMenu.update({
      name,
      discount,
      price,
      image,
      ingredients,
      serves,
      time,
      CategoryId,
    }, { where: { id } });
    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await FoodItemInMenu.destroy({ where: { id } });
    return res.status(204).end();
  }
}

export default new FoodItemController();

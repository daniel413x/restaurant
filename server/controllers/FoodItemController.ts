import { Request, Response } from 'express';
/*
import uuid from 'uuid';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
*/
import FoodItemInMenu from '../db/models/FoodItemInMenu';

class FoodItemController {
  async create(req: Request, res: Response) {
    const {
      name,
      discount,
      price,
      ingredients,
      serves,
      time,
      CategoryId,
    } = req.body;
    const imageName = 'TEMP';
    /*
    const image = req.files.image as UploadedFile;
    const imageName = `${uuid.v4()}.jpg`;
    image.mv(path.resolve(__dirname, '..', 'static', imageName));
    */
    const foodItem = await FoodItemInMenu.create({
      name,
      discount,
      price,
      image: imageName,
      ingredients,
      serves,
      time,
      CategoryId,
    });
    return res.json(foodItem);
  }

  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const updates = req.body;
    await FoodItemInMenu.update(updates, { where: { id } });
    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await FoodItemInMenu.destroy({ where: { id } });
    return res.status(204).end();
  }
}

export default new FoodItemController();

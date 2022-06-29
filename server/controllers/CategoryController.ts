import { Request, Response } from 'express';
import { col } from 'sequelize';
import FoodItemInMenu from '../db/models/FoodItemInMenu';
import Category from '../db/models/Category';

class CategoryController {
  async get(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const offset = page * limit - limit;
    const byNewest = req.query.byNewest as string;
    const publicCategory = req.query.publicCategory as string;
    const order: any[] = [];
    const where: { [key: string]: any } = {};
    const params = {
      limit,
      offset,
      order,
      where,
      include: [{
        model: FoodItemInMenu,
        as: 'foodItems',
      }],
    };
    if (byNewest) {
      params.order = [[col('createdAt'), 'DESC']];
    }
    if (publicCategory) {
      params.where.publicCategory = true;
    }
    const categorys = await Category.findAndCountAll(params);
    return res.json(categorys);
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;
    const category = await Category.create({
      name,
      publicCategory: true,
    });
    return res.json(category);
  }

  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findOne({ where: { id } });
    await category?.update({ name }, { where: { id } });
    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await Category.destroy({ where: { id } });
    return res.status(204).end();
  }
}

export default new CategoryController();

import { Request, Response } from 'express';
import FoodItemInMenu from '../db/models/FoodItemInMenu';
import Category from '../db/models/Category';
import BaseController from './BaseController';

class CategoryController extends BaseController<Category> {
  constructor() {
    super(Category);
  }

  get(req: Request, res: Response) {
    const options = {
      include: [{
        model: FoodItemInMenu,
        as: 'foodItems',
      }],
    };
    this.execFindAndCountAll(req, res, options);
  }

  create(req: Request, res: Response) {
    this.execCreate(req, res);
  }

  edit(req: Request, res: Response) {
    this.execUpdate(req, res);
  }

  async delete(req: Request, res: Response) {
    const { deletedId } = req.params;
    const items = await FoodItemInMenu.findAndCountAll({ where: { CategoryId: deletedId } });
    const uncategorized = await Category.findOne({ where: { name: 'Uncategorized' } });
    Promise.all(items.rows.map(async (item) => {
      await item.update(
        {
          CategoryId: uncategorized.id,
        },
        {
          where: {
            CategoryId: deletedId,
          },
        },
      );
    }));
    this.execDestroy(req, res);
  }
}

export default new CategoryController();

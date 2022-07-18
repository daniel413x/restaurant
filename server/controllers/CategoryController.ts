import { Request, Response } from 'express';
import FoodItemInMenu from '../db/models/FoodItemInMenu';
import Category from '../db/models/Category';
import BaseController from './BaseController';

class CategoryController extends BaseController<Category> {
  constructor() {
    super(Category);
  }

  getPublic(req: Request, res: Response) {
    const options = {
      include: [{
        model: FoodItemInMenu,
        as: 'foodItems',
      }],
      where: {
        publicCategory: true,
      },
    };
    if (req.query.publicCategory) {
      delete req.query.publicCategory;
    }
    this.execFindAndCountAll(req, res, options);
  }

  getAll(req: Request, res: Response) {
    const options = {
      include: [{
        model: FoodItemInMenu,
        as: 'foodItems',
      }],
    };
    this.execFindAndCountAll(req, res, options);
  }

  create(req: Request, res: Response) {
    const options = {
      include: [{
        model: FoodItemInMenu,
        as: 'foodItems',
      }],
    };
    if (req.body.name === 'Uncategorized') {
      req.body.publicCategory = false;
    }
    this.execCreate(req, res, options);
  }

  edit(req: Request, res: Response) {
    this.execUpdate(req, res);
  }

  async delete(req: Request, res: Response) {
    const { id: deletedId } = req.params;
    const items = await FoodItemInMenu.findAndCountAll({ where: { CategoryId: deletedId } });
    if (items.count > 0) {
      const uncategorized = await Category.findOne({ where: { name: 'Uncategorized' } });
      await Promise.all(items.rows.map(async (item) => {
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
    }
    this.execDestroy(req, res);
  }
}

export default new CategoryController();

import { Request, Response } from 'express';
import FoodItemInMenu from '../db/models/FoodItemInMenu';
import Category from '../db/models/Category';
import BaseController from './BaseController';
import { sequelize } from '../db';

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
        public: true,
      },
    };
    if (req.query.public) {
      delete req.query.public;
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
      req.body.public = false;
    }
    this.execCreate(req, res, options);
  }

  edit(req: Request, res: Response) {
    this.execUpdate(req, res);
  }

  async delete(req: Request, res: Response) {
    const { id: deletedId } = req.params;
    const items = await FoodItemInMenu.findAndCountAll({ where: { CategoryId: deletedId } });
    await sequelize.transaction(async (transaction) => {
      if (items.count > 0) {
        const uncategorized = await Category.findOne({ where: { name: 'Uncategorized' }, transaction });
        await Promise.all(items.rows.map(async (item) => {
          await item.update(
            {
              CategoryId: uncategorized.id,
            },
            {
              where: {
                CategoryId: deletedId,
              },
              transaction,
            },
          );
        }));
      }
      const options = {
        individualHooks: true,
        transaction,
      };
      await this.execDestroy(req, res, options);
    });
  }
}

export default new CategoryController();

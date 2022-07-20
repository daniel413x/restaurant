import { Request, Response, NextFunction } from 'express';
import FoodItemInMenu from '../db/models/FoodItemInMenu';
import BaseController from './BaseController';

class FoodItemInMenuController extends BaseController<FoodItemInMenu> {
  constructor() {
    super(FoodItemInMenu);
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    this.execGetOneByParamsId(req, res, next);
  }

  async create(req: Request, res: Response) {
    req.body.price = JSON.parse(req.body.price);
    req.body.discount = JSON.parse(req.body.discount);
    req.body.serves = JSON.parse(req.body.serves);
    req.body.time = JSON.parse(req.body.time);
    req.body.ingredients = JSON.parse(req.body.ingredients);
    this.execCreate(req, res);
  }

  async edit(req: Request, res: Response) {
    req.body.price = JSON.parse(req.body.price);
    req.body.discount = JSON.parse(req.body.discount);
    req.body.serves = JSON.parse(req.body.serves);
    req.body.time = JSON.parse(req.body.time);
    req.body.ingredients = JSON.parse(req.body.ingredients);
    this.execUpdate(req, res);
  }

  async delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new FoodItemInMenuController();

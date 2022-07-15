import { Request, Response } from 'express';
import FoodItemInCart from '../db/models/FoodItemInCart';
import BaseController from './BaseController';

class FoodItemInCartController extends BaseController<FoodItemInCart> {
  constructor() {
    super(FoodItemInCart);
  }

  async create(req: Request, res: Response) {
    this.execCreate(req, res);
  }

  async edit(req: Request, res: Response) {
    this.execUpdate(req, res);
  }

  async deleteItem(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new FoodItemInCartController();

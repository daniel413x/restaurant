import { Request, Response } from 'express';
/*
import uuid from 'uuid';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
*/
import FoodItemInMenu from '../db/models/FoodItemInMenu';
import BaseController from './BaseController';

class FoodItemInMenuController extends BaseController<FoodItemInMenu> {
  constructor() {
    super(FoodItemInMenu);
  }

  async create(req: Request, res: Response) {
    this.execCreate(req, res);
  }

  async edit(req: Request, res: Response) {
    this.execUpdate(req, res);
  }

  async delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new FoodItemInMenuController();

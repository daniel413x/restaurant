import { Request, Response } from 'express';
import Options from '../db/models/Options';
import BaseController from './BaseController';

class OptionsController extends BaseController<Options> {
  constructor() {
    super(Options);
  }

  async get(req: Request, res: Response) {
    const options = {
      where: {
        name: req.params.name,
      },
    };
    this.execGetOne(req, res, options);
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

export default new OptionsController();

import { Request, Response } from 'express';
import {
  Model,
  ModelStatic,
  col,
  FindAndCountOptions,
  Attributes,
  FindOptions,
} from 'sequelize';

export default abstract class BaseController<M extends Model> {
  model: ModelStatic<Model>;

  constructor(model: ModelStatic<Model>) {
    this.model = model;
  }

  async execFindOne(req: Request, res: Response, options: FindOptions<Attributes<M>>) {
    const params: { [key: string]: any } = {
      ...options,
    };
    const data = await this.model.findOne(params);
    return res.json(data);
  }

  async execFindAndCountAll(req: Request, res: Response, options: Omit<FindAndCountOptions<Attributes<M>>, 'group'>) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const offset = page * limit - limit;
    const byNewest = req.query.byNewest as string;
    const publicCategory = req.query.publicCategory as string;
    const order: any[] = [];
    const params: { [key: string]: any } = {
      where: {},
      ...options,
      limit,
      offset,
      order,
    };
    if (byNewest) {
      params.order = [[col('createdAt'), 'DESC']];
    }
    if (publicCategory) {
      params.where.publicCategory = true;
    }
    const data = await this.model.findAndCountAll(params);
    return res.json(data);
  }

  async execCreate(req: Request, res: Response) {
    const form = req.body;
    const data = await this.model.create(form);
    return res.json(data);
  }

  async execUpdate(req: Request, res: Response) {
    const { id } = req.params;
    const form = req.body;
    await this.model.update(form, { where: { id } });
    return res.status(204).end();
  }

  async execDestroy(req: Request, res: Response) {
    const { id } = req.params;
    this.model.destroy({ where: { id } });
    return res.status(204).end();
  }
}

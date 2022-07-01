import { Request, Response } from 'express';
import Category from '../db/models/Category';
import Address from '../db/models/Address';

class AddressController {
  async get(req: Request, res: Response) {
    const { id } = res.locals.user;
    const address = await Address.findOne({
      where: {
        UserId: id,
      },
    });
    return res.json(address);
  }

  async create(req: Request, res: Response) {
    const {
      firstName,
      lastName,
      addressLineOne,
      addressLineTwo,
      city,
      zip,
      state,
      saved,
      isDefault,
      UserId,
    } = req.body;
    const addressFoodItem = await Address.create({
      firstName,
      lastName,
      addressLineOne,
      addressLineTwo,
      city,
      zip,
      state,
      saved,
      UserId,
      isDefault,
    });
    return res.json(addressFoodItem);
  }

  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const updatedVals = req.body;
    await Address.update(updatedVals, { where: { id } });
    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await Category.destroy({ where: { id } });
    return res.status(204).end();
  }
}

export default new AddressController();

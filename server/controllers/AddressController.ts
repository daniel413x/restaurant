import { Request, Response } from 'express';
import Category from '../db/models/Category';
import AddressInAddressBook from '../db/models/AddressInAddressBook';

class AddressController {
  async get(req: Request, res: Response) {
    const { id } = res.locals.user;
    const addresses = await AddressInAddressBook.findAll({
      where: {
        UserId: id,
      },
    });
    return res.json(addresses);
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
      UserId,
      isDefault,
    } = req.body;
    const address = await AddressInAddressBook.create({
      firstName,
      lastName,
      addressLineOne,
      addressLineTwo,
      city,
      zip,
      state,
      UserId,
      isDefault,
    });
    return res.json(address);
  }

  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const updatedVals = req.body;
    await AddressInAddressBook.update(updatedVals, { where: { id } });
    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await Category.destroy({ where: { id } });
    return res.status(204).end();
  }
}

export default new AddressController();

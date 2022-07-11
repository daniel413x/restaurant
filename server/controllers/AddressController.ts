import { Request, Response } from 'express';
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
    const addressForm = req.body;
    const address = await AddressInAddressBook.create(addressForm);
    return res.json(address);
  }

  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const updatedVals = req.body;
    await AddressInAddressBook.update(updatedVals, { where: { id } });
    return res.status(204).end();
  }

  async setDefault(req: Request, res: Response) {
    const { id: UserId } = res.locals.user;
    const previousDefault = await AddressInAddressBook.findOne({ where: { UserId, isDefault: true } });
    if (previousDefault) {
      await previousDefault.update({ isDefault: false });
    }
    const id = req.params.id || res.locals.user.id;
    await AddressInAddressBook.update({ isDefault: true }, { where: { id } });
    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await AddressInAddressBook.destroy({ where: { id } });
    return res.status(204).end();
  }
}

export default new AddressController();

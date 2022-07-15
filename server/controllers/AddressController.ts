import { NextFunction, Request, Response } from 'express';
import AddressInAddressBook from '../db/models/AddressInAddressBook';
import ApiError from '../error/ApiError';
import BaseController from './BaseController';

const unsetPreviousDefault = async (res: Response) => {
  const { id: UserId } = res.locals.user;
  const previousDefault = await AddressInAddressBook.findOne({ where: { UserId, isDefault: true } });
  if (previousDefault) {
    await previousDefault.update({ isDefault: false });
  }
};

class AddressController extends BaseController<AddressInAddressBook> {
  constructor() {
    super(AddressInAddressBook);
  }

  get(req: Request, res: Response) {
    const { id } = res.locals.user;
    const options = {
      where: {
        UserId: id,
      },
    };
    this.execFindAndCountAll(req, res, options);
  }

  create(req: Request, res: Response, next: NextFunction) {
    const {
      firstName,
      lastName,
      addressLineOne,
      addressLineTwo,
      city,
      state,
      zip,
      isDefault,
    } = req.body;
    if (!firstName || !lastName || !addressLineOne || !addressLineTwo || !city || !state || !zip) {
      return next(ApiError.internal('Incomplete form'));
    }
    if (isDefault) {
      unsetPreviousDefault(res);
    }
    return this.execCreate(req, res);
  }

  edit(req: Request, res: Response) {
    const willSetNewDefault = req.body.isDefault;
    if (willSetNewDefault) {
      unsetPreviousDefault(res);
    }
    this.execUpdate(req, res);
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new AddressController();

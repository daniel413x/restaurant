import { NextFunction, Request, Response } from 'express';
import { Transaction } from 'sequelize';
import { sequelize } from '../db';
import AddressInAddressBook from '../db/models/AddressInAddressBook';
import ApiError from '../error/ApiError';
import BaseController from './BaseController';

class AddressController extends BaseController<AddressInAddressBook> {
  constructor() {
    super(AddressInAddressBook);
  }

  async unsetPreviousDefault(res: Response, transaction: Transaction) {
    const { id: UserId } = res.locals.user;
    const previousDefault = await AddressInAddressBook.findOne({ where: { UserId, isDefault: true } });
    if (previousDefault) {
      await AddressInAddressBook.update({ isDefault: false }, { where: { id: previousDefault.id }, transaction });
    }
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

  async create(req: Request, res: Response, next: NextFunction) {
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
    await sequelize.transaction(async (transaction) => {
      if (isDefault) {
        await this.unsetPreviousDefault(res, transaction);
      }
      await this.execCreate(req, res, { transaction });
    });
    return res.status(204).end();
  }

  async edit(req: Request, res: Response) {
    const willSetNewDefault = req.body.isDefault;
    await sequelize.transaction(async (transaction) => {
      if (willSetNewDefault) {
        await this.unsetPreviousDefault(res, transaction);
      }
      return this.execUpdate(req, res, { transaction });
    });
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new AddressController();

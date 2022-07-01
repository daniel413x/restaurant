import { NextFunction, Request, Response } from 'express';
import FoodItemInOrder from '../db/models/FoodItemInOrder';
import FoodItemInCart from '../db/models/FoodItemInCart';
import Order from '../db/models/Order';
import Address from '../db/models/Address';
import ApiError from '../error/ApiError';

class OrderController {
  async get(req: Request, res: Response) {
    const { id } = res.locals.user;
    const order = await Order.findOne({
      where: {
        UserId: id,
      },
      include: {
        model: FoodItemInOrder,
        as: 'foodItems',
      },
    });
    return res.json(order);
  }

  async create(req: Request, res: Response) {
    // get cart id, find all fooditemsincart where cartid,
    const {
      UserId,
      CartId,
      AddressId,
      firstName,
      lastName,
      addressLineOne,
      addressLineTwo,
      city,
      zip,
      state,
    } = req.body;
    let address;
    if (AddressId) {
      address = await Address.findByPk(AddressId);
    } else {
      address = await Address.create({
        firstName,
        lastName,
        addressLineOne,
        addressLineTwo,
        city,
        zip,
        state,
      });
    }
    const itemsFromCart = await FoodItemInCart.findAndCountAll({
      where: {
        CartId,
      },
    });
    let orderMinTime = 0;
    let orderMaxTime = 0;
    itemsFromCart.rows.forEach((item) => {
      const [itemMinTime, itemMaxTime] = item.time;
      if (itemMinTime > orderMinTime) {
        orderMinTime = itemMinTime;
      }
      if (itemMaxTime > orderMaxTime) {
        orderMaxTime = itemMaxTime;
      }
    });
    const order = await Order.create({
      UserId,
      AddressId: address.id,
      status: 0,
      actionLog: [`${new Date()} Order received`],
      time: [orderMinTime, orderMaxTime],
    });
    Promise.all(itemsFromCart.rows.map(async (item) => {
      await FoodItemInOrder.create({
        name: item.name,
        price: item.price,
        ingredients: item.ingredients,
        OrderId: order.id,
      });
      await FoodItemInCart.destroy({
        where: {
          id: item.id,
        },
      });
    }));
    return res.json(order);
  }

  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const updatedVals = req.body;
    await Order.update(updatedVals, { where: { id } });
    return res.status(204).end();
  }

  async changeStatus(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    let { status } = order;
    const { actionLog } = order;
    if (status === 0) {
      status += 1;
      actionLog.push(`${new Date()} Your order is being prepared`);
    } else if (status === 1) {
      status += 1;
      actionLog.push(`${new Date()} Your order is en route`);
    } else if (status === 2) {
      status += 1;
      actionLog.push(`${new Date()} Your order was delivered`);
    } else {
      return next(ApiError.conflict('Order status cannot be changed'));
    }
    await Order.update({
      status,
      actionLog,
    }, { where: { id } });
    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await Order.destroy({ where: { id } });
    return res.status(204).end();
  }
}

export default new OrderController();

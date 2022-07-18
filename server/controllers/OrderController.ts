import { NextFunction, Request, Response } from 'express';
import FoodItemInOrder from '../db/models/FoodItemInOrder';
import FoodItemInCart from '../db/models/FoodItemInCart';
import Order from '../db/models/Order';
import AddressForOrder from '../db/models/AddressForOrder';
import ApiError from '../error/ApiError';
import { calcTotal } from '../utils/functions';
import BaseController from './BaseController';

class OrderController extends BaseController<Order> {
  constructor() {
    super(Order);
  }

  get(req: Request, res: Response) {
    const { id } = res.locals.user;
    const options = {
      where: {
        UserId: id,
      },
      include: {
        model: FoodItemInOrder,
        as: 'foodItems',
      },
    };
    this.execFindAndCountAll(req, res, options);
  }

  getAllForAdmin(req: Request, res: Response) {
    const options = {
      include: [{
        model: FoodItemInOrder,
        as: 'foodItems',
      },
      {
        model: AddressForOrder,
        as: 'address',
      }],
    };
    this.execFindAndCountAll(req, res, options);
  }

  getActiveOrder(req: Request, res: Response) {
    const { id } = res.locals.user;
    const options = {
      where: {
        UserId: id,
        activeOrder: true,
      },
      include: [{
        model: FoodItemInOrder,
        as: 'foodItems',
      },
      {
        model: AddressForOrder,
        as: 'address',
      }],
    };
    this.execFindOne(req, res, options);
  }

  async create(req: Request, res: Response) {
    const {
      UserId,
      CartId,
    } = req.body;
    const {
      firstName,
      lastName,
      addressLineOne,
      addressLineTwo,
      city,
      zip,
      state,
    } = req.body.address;
    const address = await AddressForOrder.create({
      firstName,
      lastName,
      addressLineOne,
      addressLineTwo,
      city,
      zip,
      state,
    });
    const itemsFromCart = await FoodItemInCart.findAndCountAll({
      where: {
        CartId,
      },
    });
    const total = calcTotal(itemsFromCart.rows);
    const date = new Date().toString();
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
      total,
      date,
      AddressForOrderId: address.id,
      status: 0,
      actionLog: [[new Date().toString(), 'Order received']],
      time: [orderMinTime, orderMaxTime],
      activeOrder: true,
    });
    await Promise.all(itemsFromCart.rows.map(async (item) => {
      await FoodItemInOrder.create({
        name: item.name,
        price: item.price,
        discount: item.discount,
        ingredients: item.ingredients,
        OrderId: order.id,
        quantity: item.quantity,
        instructions: item.instructions,
      });
      await FoodItemInCart.destroy({
        where: {
          id: item.id,
        },
      });
    }));
    await address.update({
      OrderId: order.id,
    });
    return res.json(order);
  }

  async edit(req: Request, res: Response) {
    this.execUpdate(req, res);
  }

  async changeStatus(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    let { status } = order;
    const { actionLog } = order;
    if (status === 0) {
      status += 1;
      actionLog.push([new Date().toString(), 'Your order is being prepared']);
    } else if (status === 1) {
      status += 1;
      actionLog.push([new Date().toString(), 'Your order is en route']);
    } else if (status === 2) {
      status += 1;
      actionLog.push([new Date().toString(), 'Your order was delivered']);
    } else {
      return next(ApiError.conflict('Order status cannot be changed'));
    }
    req.body = {
      status,
      actionLog,
    };
    /*
    await Order.update({
      status,
      actionLog,
    }, { where: { id } });
    return res.status(204).end();
    */
    return this.execUpdate(req, res);
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new OrderController();

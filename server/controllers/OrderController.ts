import { WhereOptions } from 'sequelize';
import { Request, Response } from 'express';
import FoodItemInOrder from '../db/models/FoodItemInOrder';
import FoodItemInCart from '../db/models/FoodItemInCart';
import Order from '../db/models/Order';
import AddressForOrder from '../db/models/AddressForOrder';
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

  getActiveGuestOrder(req: Request, res: Response) {
    const { id } = res.locals.user;
    const options = {
      where: {
        guestId: id,
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

  private generateDependantOrderProperties(arr: FoodItemInCart[]) {
    const total = calcTotal(arr);
    let orderMinTime = 0;
    let orderMaxTime = 0;
    arr.forEach((item) => {
      const [itemMinTime, itemMaxTime] = item.time;
      if (itemMinTime > orderMinTime) {
        orderMinTime = itemMinTime;
      }
      if (itemMaxTime > orderMaxTime) {
        orderMaxTime = itemMaxTime;
      }
    });
    return {
      time: [orderMinTime, orderMaxTime] as [number, number],
      total,
    };
  }

  private async nullPreviousActiveOrder(obj: WhereOptions<any>) {
    const previousActiveOrder = await Order.findOne({ where: { activeOrder: true, ...obj } });
    if (previousActiveOrder) {
      await previousActiveOrder.update({ activeOrder: false });
    }
  }

  async guestCreate(req: Request, res: Response) {
    const address = await AddressForOrder.create(req.body.address);
    const { foodItems } = req.body;
    const { guestId } = req.body;
    const orderProperties = this.generateDependantOrderProperties(foodItems);
    const date = new Date().toString();
    await this.nullPreviousActiveOrder({ guestId });
    const order = await Order.create({
      ...orderProperties,
      date,
      guestId,
      AddressForOrderId: address.id,
      status: 0,
      actionLog: [[new Date().toString(), 'Order received']],
      activeOrder: true,
    });
    await Promise.all(foodItems.map(async (item) => {
      await FoodItemInOrder.create({
        name: item.name,
        price: item.price,
        discount: item.discount,
        ingredients: item.ingredients,
        OrderId: order.id,
        quantity: item.quantity,
        instructions: item.instructions,
      });
    }));
    await address.update({
      OrderId: order.id,
    });
    return res.json(order);
  }

  async create(req: Request, res: Response) {
    const {
      UserId,
      CartId,
    } = req.body;
    const address = await AddressForOrder.create(req.body.address);
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
    this.nullPreviousActiveOrder({ UserId });
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

  async changeStatus(req: Request, res: Response) {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    const { status } = req.body;
    const { actionLog } = order;
    if (status >= 1 && actionLog.length === 1) {
      actionLog.push([new Date().toString(), 'Your order is being prepared']);
    }
    if (status >= 2 && actionLog.length === 2) {
      actionLog.push([new Date().toString(), 'Your order is en route']);
    }
    if (status >= 3 && actionLog.length === 3) {
      actionLog.push([new Date().toString(), 'Your order was delivered']);
    }
    req.body = {
      status,
      actionLog,
    };
    return this.execUpdate(req, res);
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new OrderController();

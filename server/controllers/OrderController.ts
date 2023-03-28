import { Transaction, WhereOptions } from 'sequelize';
import { Request, Response } from 'express';
import FoodItemInOrder from '../db/models/FoodItemInOrder';
import FoodItemInCart from '../db/models/FoodItemInCart';
import Order from '../db/models/Order';
import AddressForOrder from '../db/models/AddressForOrder';
import { calcTotal } from '../utils/functions';
import BaseController from './BaseController';
import { sequelize } from '../db';

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

  private async nullPreviousActiveOrder(obj: WhereOptions<any>, transaction: Transaction) {
    const previousActiveOrder = await Order.findOne({ where: { activeOrder: true, ...obj }, transaction });
    if (previousActiveOrder) {
      await Order.update({ activeOrder: false }, { transaction, where: { id: previousActiveOrder.id } });
    }
  }

  async guestCreate(req: Request, res: Response) {
    const { foodItems } = req.body;
    const { guestId } = req.body;
    const orderProperties = this.generateDependantOrderProperties(foodItems);
    const date = new Date().toString();
    await sequelize.transaction(async (transaction) => {
      await this.nullPreviousActiveOrder({ UserId: guestId }, transaction);
      const order = await Order.create({
        ...orderProperties,
        date,
        UserId: guestId,
        status: 0,
        actionLog: [[new Date().toString(), 'Order received']],
        activeOrder: true,
      }, { transaction });
      await Promise.all(foodItems.map(async (item) => {
        await FoodItemInOrder.create({
          name: item.name,
          price: item.price,
          discount: item.discount,
          ingredients: item.ingredients,
          OrderId: order.id,
          quantity: item.quantity,
          instructions: item.instructions,
        }, { transaction });
      }));
      await AddressForOrder.create({
        ...req.body.address,
        OrderId: order.id,
      }, { transaction });
      return res.json(order);
    });
  }

  async create(req: Request, res: Response) {
    const {
      UserId,
      CartId,
    } = req.body;
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
    await sequelize.transaction(async (transaction) => {
      this.nullPreviousActiveOrder({ UserId }, transaction);
      const order = await Order.create({
        UserId,
        total,
        date,
        status: 0,
        actionLog: [[new Date().toString(), 'Order received']],
        time: [orderMinTime, orderMaxTime],
        activeOrder: true,
      }, { transaction });
      await Promise.all(itemsFromCart.rows.map(async (item) => {
        await FoodItemInOrder.create({
          name: item.name,
          price: item.price,
          discount: item.discount,
          ingredients: item.ingredients,
          OrderId: order.id,
          quantity: item.quantity,
          instructions: item.instructions,
        }, { transaction });
        await FoodItemInCart.destroy({
          where: {
            id: item.id,
          },
          transaction,
        });
      }));
      await AddressForOrder.create({
        ...req.body.address,
        OrderId: order.id,
      }, { transaction });
      return res.json(order);
    });
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

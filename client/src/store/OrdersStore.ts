import { makeAutoObservable } from 'mobx';
import {
  IOrder,
} from '../types/types';
import { calcTotal } from '../utils/functions';

export default class OrdersStore {
  orders: IOrder[];

  activeOrder: IOrder;

  constructor() {
    this.orders = [];
    this.activeOrder = {
      foodItems: [],
      id: -1,
      UserId: '-1',
      status: {
        value: -1,
        actionLog: [],
      },
      date: '5/26/22',
      total: 0,
      addressId: 1,
      address: {
        id: 1,
        firstName: 'Daniel',
        lastName: 'Admin',
        addressLineOne: '2425 TypeScript Avenue',
        addressLineTwo: '#333',
        city: 'Washington',
        zip: '20008',
        state: 'DC',
        UserId: 'TEMP',
      },
    };
    makeAutoObservable(this);
  }

  get all() {
    return this.orders;
  }

  get getActiveOrder() {
    return this.activeOrder;
  }

  get total() {
    return this.orders.map((order) => calcTotal(order.foodItems)).reduce((a, b) => a + b);
  }

  addOrder(obj: IOrder) {
    this.orders = [...this.orders, obj];
  }

  setOrders(arr: IOrder[]) {
    this.orders = arr;
  }

  setActiveOrder(obj: IOrder) {
    this.activeOrder = obj;
  }
}

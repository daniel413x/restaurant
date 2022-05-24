import { makeAutoObservable } from 'mobx';
import {
  IOrder,
} from '../types/types';

export default class OrdersStore {
  orders: IOrder[];

  activeOrder: IOrder;

  constructor() {
    this.orders = [];
    // this.activeOrder = null;
    this.activeOrder = {
      foodItems: [],
      id: 5,
      userId: -1,
      status: {
        value: -1,
        actionLog: [],
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

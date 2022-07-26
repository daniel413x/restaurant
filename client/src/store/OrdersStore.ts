import { makeAutoObservable } from 'mobx';
import {
  IOrder,
} from '../types/types';

export default class OrdersStore {
  orders: IOrder[];

  activeOrder: IOrder | any;

  constructor() {
    this.orders = [];
    this.activeOrder = {
      id: '-1',
      UserId: '-1',
      status: -1,
      actionLog: [],
      date: '',
      foodItems: [],
      address: {
        id: '',
        firstName: '',
        lastName: '',
        addressLineOne: '',
        addressLineTwo: '',
        city: '',
        zip: '',
        state: '',
        UserId: '',
      },
      total: 0,
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

  unset() {
    this.orders = [];
    this.activeOrder = undefined;
  }
}

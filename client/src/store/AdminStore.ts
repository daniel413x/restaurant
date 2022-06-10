import { makeAutoObservable } from 'mobx';
import {
  IOrder,
} from '../types/types';

export default class AdminStore {
  orders: IOrder[];

  constructor() {
    this.orders = [];
    makeAutoObservable(this);
  }

  get allOrders() {
    return this.orders;
  }

  setOrders(arr: IOrder[]) {
    this.orders = arr;
  }

  setOrderStatus(orderObj: IOrder, newStatus: number) {
    const updatedOrder = { ...orderObj };
    updatedOrder.status.value = newStatus;
    this.orders = this.orders.map((order) => {
      if (order.id === updatedOrder.id) {
        return updatedOrder;
      }
      return order;
    });
  }
}

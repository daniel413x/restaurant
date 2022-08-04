import {
  IOrder,
  QueryReqSubmitOrder,
  QueryReqSubmitGuestOrder,
} from '../types/types';
import { $authHost } from './index';

export const fetchUserOrders = async (): Promise<IOrder[]> => {
  const { data } = await $authHost.get('api/order');
  return data.rows;
};

export const fetchAllOrders = async (): Promise<IOrder[]> => {
  const { data } = await $authHost.get('api/order/all');
  return data.rows;
};

export const fetchActiveOrder = async (): Promise<IOrder> => {
  const { data } = await $authHost.get('api/order/activeorder');
  return data;
};

export const submitOrder = async (obj: QueryReqSubmitOrder) => {
  const { data } = await $authHost.post('api/order', obj);
  return data;
};

export const updateOrderStatus = async (id: string, status: number) => {
  const { data } = await $authHost.put(`api/order/changestatus/${id}`, { status });
  return data;
};

export const submitGuestOrder = async (obj: QueryReqSubmitGuestOrder) => {
  const { data } = await $authHost.post('api/order/guest', obj);
  return data;
};

export const fetchActiveGuestOrder = async (): Promise<IOrder> => {
  const { data } = await $authHost.get('api/order/guest/activeorder');
  return data;
};

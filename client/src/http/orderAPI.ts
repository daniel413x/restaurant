import { IOrder, QueryReqSubmitOrder } from '../types/types';
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

export const updateOrderStatus = async (id: string) => {
  const { data } = await $authHost.put(`api/order/changestatus/${id}`);
  return data;
};

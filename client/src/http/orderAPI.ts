import { IOrder, QuerySubmittedOrder } from '../types/types';
import { $authHost } from './index';

export const fetchAllOrders = async (): Promise<IOrder[]> => {
  const { data } = await $authHost.get('api/order');
  return data.rows;
};

export const fetchActiveOrder = async (): Promise<IOrder> => {
  const { data } = await $authHost.get('api/order/activeorder');
  return data;
};

export const submitOrder = async (obj: QuerySubmittedOrder) => {
  const { data } = await $authHost.post('api/order', obj);
  return data;
};

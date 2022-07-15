import { QueryReqMenuFoodItem } from '../types/types';
import { $authHost } from './index';

export const addFoodItem = async (obj: QueryReqMenuFoodItem) => {
  const { data } = await $authHost.post('api/fooditeminmenu', obj);
  return data;
};

export const changeQuantity = async (id: string, quantity: number) => {
  const { data } = await $authHost.put(`api/fooditeminmenu/${id}`, { quantity });
  return data;
};

export const removeFoodItem = async (id: string) => {
  const { data } = await $authHost.delete(`api/fooditemincart/${id}`);
  return data;
};

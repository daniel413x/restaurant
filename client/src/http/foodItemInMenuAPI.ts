import { IFoodItem, QueryReqMenuFoodItem } from '../types/types';
import { $authHost } from './index';

export const fetchOneFoodItem = async (id: string): Promise<IFoodItem> => {
  const { data } = await $authHost.get(`api/fooditeminmenu/${id}`);
  return data;
};

export const createFoodItem = async (obj: QueryReqMenuFoodItem | FormData): Promise<IFoodItem> => {
  const { data } = await $authHost.post('api/fooditeminmenu', obj);
  return data;
};

export const editFoodItem = async (id: string, obj: QueryReqMenuFoodItem | FormData) => {
  const { data } = await $authHost.put(`api/fooditeminmenu/${id}`, obj);
  return data;
};

export const deleteFoodItem = async (id: string) => {
  const { data } = await $authHost.delete(`api/fooditemincart/${id}`);
  return data;
};

import { ICart } from '../types/types';
import { $authHost } from './index';

export const fetchOneCart = async (): Promise<ICart> => {
  const { data } = await $authHost.get('api/cart');
  return data;
};

export const addFoodItem = async (id: string) => {
  const { data } = await $authHost.post('api/cart', { id });
  return data;
};

export const removeFoodItem = async (id: string) => {
  const { data } = await $authHost.delete(`api/cart/${id}`);
  return data;
};

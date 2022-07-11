import { ICart, QueryReqCartFoodItem } from '../types/types';
import { $authHost } from './index';

export const fetchUserCart = async (): Promise<ICart> => {
  const { data } = await $authHost.get('api/cart');
  return data;
};

export const addFoodItem = async (obj: QueryReqCartFoodItem) => {
  const { data } = await $authHost.post('api/cart/additem', obj);
  return data;
};

export const changeQuantity = async (id: string, quantity: number, increment?: boolean) => {
  const { data } = await $authHost.put(`api/cart/changequantity/${id}`, { quantity, increment });
  return data;
};

export const removeFoodItem = async (id: string) => {
  const { data } = await $authHost.delete(`api/cart/${id}`);
  return data;
};

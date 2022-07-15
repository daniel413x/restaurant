import { ICart } from '../types/types';
import { $authHost } from './index';

// eslint-disable-next-line import/prefer-default-export
export const fetchUserCart = async (): Promise<ICart> => {
  const { data } = await $authHost.get('api/cart');
  return data;
};

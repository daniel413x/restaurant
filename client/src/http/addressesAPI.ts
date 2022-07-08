import { IAddress, QueryNewAddress } from '../types/types';
import { $authHost } from './index';

export const fetchUserAddress = async (): Promise<IAddress[]> => {
  const { data } = await $authHost.get('api/address');
  return data;
};

export const addNewAddress = async (obj: QueryNewAddress) => {
  const { data } = await $authHost.post('api/address', obj);
  return data;
};

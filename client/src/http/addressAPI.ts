import { IAddress, QueryNewAddress } from '../types/types';
import { $authHost } from './index';

export const fetchAddresses = async (): Promise<IAddress[]> => {
  const { data } = await $authHost.get('api/address');
  return data;
};

export const createAddress = async (
  obj: QueryNewAddress,
): Promise<IAddress> => {
  const { data } = await $authHost.post('api/address', obj);
  return data;
};

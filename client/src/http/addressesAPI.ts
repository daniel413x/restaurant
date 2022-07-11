import { IAddress, QueryReqAddress } from '../types/types';
import { $authHost } from './index';

export const fetchUserAddress = async (): Promise<IAddress[]> => {
  const { data } = await $authHost.get('api/address');
  return data;
};

export const createNewAddress = async (obj: QueryReqAddress) => {
  const { data } = await $authHost.post('api/address', obj);
  return data;
};

export const editAddress = async (obj: QueryReqAddress | FormData): Promise<IAddress> => {
  const { data } = await $authHost.put('api/address', obj);
  return data.token;
};

export const setDefault = async (id: string): Promise<IAddress> => {
  const { data } = await $authHost.put(`api/address/setdefault/${id}`);
  return data.token;
};

export const deleteAddress = async (id: string): Promise<any> => {
  const { data } = await $authHost.delete(`api/address/${id}`);
  return data.token;
};

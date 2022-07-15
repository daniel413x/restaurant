import {
  IAddress,
  QueryPOSTReqAddress,
  QueryPUTReqAddress,
} from '../types/types';
import { $authHost } from './index';

export const fetchUserAddress = async (): Promise<IAddress[]> => {
  const { data } = await $authHost.get('api/address');
  return data.rows;
};

export const createAddress = async (obj: QueryPOSTReqAddress) => {
  const { data } = await $authHost.post('api/address', obj);
  return data;
};

export const editAddress = async (id: string, obj: QueryPUTReqAddress): Promise<IAddress> => {
  const { data } = await $authHost.put(`api/address/${id}`, obj);
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

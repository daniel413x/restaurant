import {
  ICategoriesSorter,
  QueryReqUpdateOptions,
} from '../types/types';
import { $authHost } from './index';

export const fetchOptionsByName = async (str: string): Promise<ICategoriesSorter> => {
  const { data } = await $authHost.get(`api/options/${str}`);
  return data;
};

export const updateOptionsObject = async (id: string, obj: QueryReqUpdateOptions): Promise<void> => {
  const { data } = await $authHost.put(`api/options/${id}`, obj);
  return data;
};

import {
  ICategory,
} from '../types/types';
import { $authHost, $host } from './index';

export const fetchPublicCategories = async (): Promise<ICategory[]> => {
  const { data } = await $host.get('api/category/public');
  return data.rows;
};

export const fetchAllCategories = async (): Promise<ICategory[]> => {
  const { data } = await $authHost.get('api/category/all');
  return data.rows;
};

export const fetchCategories = async (): Promise<ICategory[]> => {
  const { data } = await $authHost.get('api/category');
  return data.rows;
};

export const createCategory = async (name: string): Promise<ICategory> => {
  const { data } = await $authHost.post('api/category', { name });
  return data;
};

export const editCategory = async (id: string, name: string): Promise<ICategory> => {
  const { data } = await $authHost.put(`api/category/${id}`, { name });
  return data;
};

export const deleteCategory = async (id: string): Promise<any> => {
  const { data } = await $authHost.delete(`api/category/${id}`);
  return data.token;
};
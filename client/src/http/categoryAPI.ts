import CategoriesStore from '../store/CategoriesStore';
import {
  ICategory,
} from '../types/types';
import { $authHost, $host } from './index';
import { fetchOptionsByName } from './optionsAPI';

export const fetchPublicCategories = async (): Promise<ICategory[]> => {
  const { data } = await $host.get('api/category/public');
  return data.rows;
};

export const fetchAllCategories = async (): Promise<ICategory[]> => {
  const { data } = await $authHost.get('api/category/all');
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

export const fetchAndSortCategories = async (categories: CategoriesStore, publicOnly?: boolean): Promise<any> => {
  const sortingOptions = await fetchOptionsByName('categoriesSorting');
  categories.setSorter(sortingOptions);
  let fetchedCategories;
  if (publicOnly) {
    fetchedCategories = await fetchPublicCategories();
  } else {
    fetchedCategories = await fetchAllCategories();
  }
  categories.setCategories(fetchedCategories);
};

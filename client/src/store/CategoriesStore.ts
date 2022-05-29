import { makeAutoObservable } from 'mobx';
import {
  IFoodCategory,
} from '../types/types';

export default class UserStore {
  categories: IFoodCategory[];

  constructor() {
    this.categories = [];
    makeAutoObservable(this);
  }

  setCategories(arr: IFoodCategory[]) {
    this.categories = arr;
  }

  setNewName(id: number, str: string) {
    const updatedCategory = this.categories.find((category) => category.id === id);
    updatedCategory!.name = str;
    this.categories = this.categories.map((category) => {
      if (category.id === updatedCategory?.id) {
        return updatedCategory;
      }
      return category;
    });
  }

  add(obj: IFoodCategory) {
    this.categories = [...this.categories, obj];
  }

  delete(id: number) {
    this.categories = this.categories.filter((category) => category.id !== id);
  }

  get all() {
    return this.categories;
  }
}

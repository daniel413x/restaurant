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

  get all() {
    return this.categories;
  }
}

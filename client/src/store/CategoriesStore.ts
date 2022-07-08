import { makeAutoObservable } from 'mobx';
import {
  IFoodCategory, IFoodItem,
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

  deleteCategory(obj: IFoodCategory) {
    const {
      id,
      foodItems,
    } = obj;
    const uncategorized = this.categories.find((category) => category.id === -1)!;
    uncategorized.foodItems = uncategorized.foodItems.concat(foodItems);
    const newCategories = this.categories.filter((category) => category.id !== id).map((category) => {
      if (category.id === -1) {
        return uncategorized;
      }
      return category;
    });
    this.categories = newCategories;
  }

  addFoodItem(obj: IFoodItem) {
    const updatedCategory = this.categories.find((category) => category.id === obj.category!.id)!;
    updatedCategory.foodItems = [...updatedCategory.foodItems, obj];
    this.categories = this.categories.map((category) => {
      if (category.id === updatedCategory.id) {
        return updatedCategory;
      }
      return category;
    });
  }

  deleteFoodItem(deletedFoodItemId: string, foodCategoryId: number) {
    const updatedCategory = this.categories.find((category) => category.id === foodCategoryId)!;
    updatedCategory.foodItems = updatedCategory?.foodItems.filter((foodItem) => foodItem.id !== deletedFoodItemId);
    this.categories = this.categories.map((category) => {
      if (category.id === updatedCategory.id) {
        return updatedCategory;
      }
      return category;
    });
  }

  updateFoodItem(updatedFoodItem: IFoodItem, previousCategoryId?: number) {
    if (previousCategoryId && previousCategoryId >= 0) {
      const previousCategory = this.categories.find((category) => category.id === previousCategoryId)!;
      previousCategory.foodItems = previousCategory.foodItems.filter((foodItem) => foodItem.id !== updatedFoodItem.id);
      const newCategory = this.categories.find((category) => category.id === updatedFoodItem.category!.id)!;
      newCategory.foodItems = [...newCategory.foodItems, updatedFoodItem];
      this.categories = this.categories.map((category) => {
        if (category.id === previousCategory.id) {
          return previousCategory;
        }
        if (category.id === newCategory.id) {
          return newCategory;
        }
        return category;
      });
      return;
    }
    const itemCategory = this.categories.find((category) => category.id === updatedFoodItem.category!.id)!;
    itemCategory.foodItems = itemCategory.foodItems.map((foodItem) => {
      if (foodItem.id === updatedFoodItem.id) {
        return updatedFoodItem;
      }
      return foodItem;
    });
    this.categories = this.categories.map((category) => {
      if (category.id === itemCategory.id) {
        return itemCategory;
      }
      return category;
    });
  }

  get all() {
    const sortedCategories = this.categories.slice().sort((a, b) => a.id + b.id);
    return sortedCategories;
  }
}

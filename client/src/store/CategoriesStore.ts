import { makeAutoObservable } from 'mobx';
import {
  ICategory, IFoodItem,
} from '../types/types';

export default class UserStore {
  categories: ICategory[];

  constructor() {
    this.categories = [];
    makeAutoObservable(this);
  }

  setCategories(arr: ICategory[]) {
    this.categories = arr;
  }

  setNewName(id: string, str: string) {
    const updatedCategory = this.categories.find((category) => category.id === id);
    updatedCategory!.name = str;
    this.categories = this.categories.map((category) => {
      if (category.id === updatedCategory?.id) {
        return updatedCategory;
      }
      return category;
    });
  }

  add(obj: ICategory) {
    this.categories = [...this.categories, obj];
  }

  deleteCategory(obj: ICategory) {
    const {
      id,
      foodItems,
    } = obj;
    const uncategorized = this.categories.find((category) => category.name === 'Uncategorized')!;
    uncategorized.foodItems = uncategorized.foodItems.concat(foodItems);
    const newCategories = this.categories.filter((category) => category.id !== id).map((category) => {
      if (category.name === 'Uncategorized') {
        return uncategorized;
      }
      return category;
    });
    this.categories = newCategories;
  }

  addFoodItem(obj: IFoodItem) {
    const updatedCategory = this.categories.find((category) => category.id === obj.CategoryId)!;
    updatedCategory.foodItems = [...updatedCategory.foodItems, obj];
    this.categories = this.categories.map((category) => {
      if (category.id === updatedCategory.id) {
        return updatedCategory;
      }
      return category;
    });
  }

  deleteFoodItem(deletedFoodItemId: string, foodCategoryId: string) {
    const updatedCategory = this.categories.find((category) => category.id === foodCategoryId)!;
    updatedCategory.foodItems = updatedCategory?.foodItems.filter((foodItem) => foodItem.id !== deletedFoodItemId);
    this.categories = this.categories.map((category) => {
      if (category.id === updatedCategory.id) {
        return updatedCategory;
      }
      return category;
    });
  }

  updateFoodItem(updatedFoodItem: IFoodItem, previousCategoryId?: string) {
    if (previousCategoryId) {
      const previousCategory = this.categories.find((category) => category.id === previousCategoryId)!;
      previousCategory.foodItems = previousCategory.foodItems.filter((foodItem) => foodItem.id !== updatedFoodItem.id);
      const newCategory = this.categories.find((category) => category.id === updatedFoodItem.CategoryId)!;
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
    const itemCategory = this.categories.find((category) => category.id === updatedFoodItem.CategoryId)!;
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
    // const sortedCategories = this.categories.slice().sort((a, b) => a.id + b.id);
    return this.categories;
  }
}

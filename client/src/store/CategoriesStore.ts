import { makeAutoObservable } from 'mobx';
import {
  ICategory, IFoodItem, ICategoriesSorter,
} from '../types/types';

export default class CategoriesStore {
  categories: ICategory[];

  sorter: ICategoriesSorter;

  sortingMode: boolean;

  draggedId: string;

  constructor() {
    this.categories = [];
    this.sorter = {
      id: '-1',
      array: [],
    };
    this.sortingMode = false;
    this.draggedId = '';
    makeAutoObservable(this);
  }

  setCategories(arr: ICategory[]) {
    this.categories = arr;
  }

  setSorter(obj: ICategoriesSorter | string[]) {
    if (Array.isArray(obj)) {
      this.sorter.array = obj;
    } else {
      this.sorter = obj;
    }
  }

  setSortingMode(bool: boolean) {
    this.sortingMode = bool;
  }

  setDraggedId(str: string) {
    this.draggedId = str;
  }

  setNewName(id: string, str: string) {
    const updatedCategory = this.categories.find((category) => category.id === id);
    updatedCategory!.name = str;
    this.sorter.array = this.sorter.array.map((categoryName) => {
      if (categoryName === str) {
        return str;
      }
      return categoryName;
    });
    this.categories = this.categories.map((category) => {
      if (category.id === updatedCategory?.id) {
        return updatedCategory;
      }
      return category;
    });
  }

  add(obj: ICategory) {
    this.sorter.array = this.sorter.array.concat(obj.name);
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

  get sortedPublic() {
    const sortingArray = this.sorter.array;
    return this.categories.filter((cat) => cat.publicCategory)
      .sort((a, b) => {
        const aIndex = sortingArray.indexOf(a.name);
        const bIndex = sortingArray.indexOf(b.name);
        if (bIndex > aIndex) {
          return -1;
        }
        return 1;
      });
  }

  get all() {
    // const sortedCategories = this.categories.slice().sort((a, b) => a.id + b.id);
    // const sortedCategories = [this.categories]
    // .sort((a, b) => {
    // });
    return this.categories;
  }
}

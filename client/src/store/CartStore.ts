import { makeAutoObservable } from 'mobx';
import {
  ICart, IFoodItem,
} from '../types/types';
import { calcTotal } from '../utils/functions';

export default class CartStore implements ICart {
  id: number;

  UserId: string;

  foodItems: IFoodItem[];

  constructor() {
    this.id = -1;
    this.UserId = '-1';
    this.foodItems = [];
    makeAutoObservable(this);
  }

  get total() {
    return calcTotal(this.foodItems);
  }

  addItem(obj: IFoodItem, quantity: number, instructions: string) { // for AddItem.tsx
    const addedItem = { ...obj };
    addedItem.quantity = quantity;
    addedItem.instructions = instructions;
    this.foodItems = [...this.foodItems, addedItem];
  }

  changeItemQuantity(foodId: number, val: number) { // for /cart
    const foodItemIndex = this.foodItems.findIndex((foodItem: IFoodItem) => foodItem.id === foodId);
    let { foodItems } = this;
    if (val === 0) {
      foodItems = foodItems.filter((foodItem: IFoodItem) => foodItem.id !== foodId);
    } else {
      foodItems[foodItemIndex].quantity! += val;
    }
    this.foodItems = foodItems;
  }

  clearItems() {
    this.foodItems = [];
  }

  setCart(obj: ICart) {
    const { id, UserId, foodItems } = obj;
    this.id = id;
    this.UserId = UserId;
    this.foodItems = foodItems;
  }

  unsetCart() {
    this.id = -1;
    this.UserId = '-1';
    this.foodItems = [];
  }
}

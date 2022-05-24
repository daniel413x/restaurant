import { makeAutoObservable } from 'mobx';
import {
  ICart, IFoodItem,
} from '../types/types';
import { calcItemPrice } from '../utils/functions';

export default class CartStore implements ICart {
  id: number;

  userId: number;

  foodItems: IFoodItem[];

  constructor() {
    this.id = -1;
    this.userId = -1;
    this.foodItems = [];
    makeAutoObservable(this);
  }

  get total() {
    let total = 0;
    if (this.foodItems.length === 0) {
      return total;
    }
    this.foodItems.forEach((foodItem: IFoodItem) => {
      const { quantity, discount, price } = foodItem;
      const itemTotal = calcItemPrice(price! * quantity!, discount);
      total += Number(itemTotal) * 1000;
    });
    return total * 0.001;
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
    const { id, userId, foodItems } = obj;
    this.id = id;
    this.userId = userId;
    this.foodItems = foodItems;
  }

  unsetCart() {
    this.id = -1;
    this.userId = -1;
    this.foodItems = [];
  }
}

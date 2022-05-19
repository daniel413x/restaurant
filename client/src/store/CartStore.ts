import { makeAutoObservable } from 'mobx';
import {
  ICart, IFoodItem,
} from '../types/types';
import { calcItemPrice } from '../utils/functions';

export default class CartStore {
  cart: ICart;

  constructor() {
    this.cart = {
      foodItems: [],
      id: -1,
    };
    makeAutoObservable(this);
  }

  get total() {
    let total = 0;
    if (this.cart.foodItems.length === 0) {
      return total;
    }
    this.cart.foodItems.forEach((foodItem: IFoodItem) => {
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
    this.cart.foodItems = [...this.cart.foodItems, addedItem];
  }

  changeItemQuantity(foodId: number, val: number) { // for /cart
    const foodItemIndex = this.cart.foodItems.findIndex((foodItem: IFoodItem) => foodItem.id === foodId);
    let { foodItems } = this.cart;
    if (val === 0) {
      foodItems = foodItems.filter((foodItem: IFoodItem) => foodItem.id !== foodId);
    } else {
      foodItems[foodItemIndex].quantity! += val;
    }
    this.cart.foodItems = foodItems;
  }

  setCart(obj: ICart) {
    this.cart = obj;
  }
}

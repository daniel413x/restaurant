import { makeAutoObservable } from 'mobx';
import {
  ICart, IFoodItem,
} from '../types/types';

export default class CartStore {
  cart: ICart;

  total: number;

  constructor() {
    this.cart = {
      foodItems: [],
      id: -1,
    };
    this.total = 0;
    makeAutoObservable(this);
  }

  addItem(obj: IFoodItem, quantity: number, instructions: string) { // for AddItem.tsx
    const addedItem = { ...obj };
    addedItem.quantity = quantity;
    addedItem.instructions = instructions;
    this.cart.foodItems = [...this.cart.foodItems, addedItem];
    console.log(this.cart.foodItems);
  }

  changeItemQuantity(foodId: number, val: number) { // for /cart
    const indexOfFoodItem = this.cart.foodItems.findIndex((foodItem: IFoodItem) => foodItem.id === foodId);
    const { foodItems } = this.cart;
    foodItems[indexOfFoodItem].quantity! += val;
    this.cart.foodItems = foodItems;
  }

  setCart(obj: ICart) {
    this.cart = obj;
  }
}

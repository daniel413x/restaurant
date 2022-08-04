import { makeAutoObservable } from 'mobx';
import {
  ICart, OrderOrCartFoodItem,
} from '../types/types';
import { calcTotal } from '../utils/functions';

export default class CartStore implements ICart {
  id: string;

  UserId: string;

  foodItems: OrderOrCartFoodItem[];

  constructor() {
    this.id = 'GUEST';
    this.UserId = 'GUEST';
    this.foodItems = [];
    makeAutoObservable(this);
  }

  get total() {
    return calcTotal(this.foodItems);
  }

  addItem(obj: OrderOrCartFoodItem) { // for AddItem.tsx
    this.foodItems = [...this.foodItems, obj];
  }

  changeItemQuantity(foodItemId: string, newQuantity: number) { // for /cart
    let { foodItems } = this;
    const foodItemIndex = foodItems.findIndex((foodItem: OrderOrCartFoodItem) => foodItem.id === foodItemId);
    if (newQuantity === 0) {
      foodItems = foodItems.filter((foodItem: OrderOrCartFoodItem) => foodItem.id !== foodItemId);
    } else {
      foodItems[foodItemIndex].quantity! = newQuantity;
    }
    this.foodItems = foodItems;
  }

  clearItems() {
    this.foodItems = [];
  }

  set(obj: ICart) {
    const { id, UserId, foodItems } = obj;
    this.id = id;
    this.UserId = UserId;
    this.foodItems = foodItems;
    localStorage.removeItem('guestCartItems');
  }

  setItems(arr: OrderOrCartFoodItem[]) {
    this.foodItems = arr;
  }

  setId(str: string) {
    this.id = str;
  }

  unset() {
    this.id = '-1';
    this.UserId = '-1';
    this.foodItems = [];
    localStorage.removeItem('guestCartItems');
  }
}

import { makeAutoObservable } from 'mobx';
import {
  CartFoodItem,
  ICart, OrderOrCartFoodItem,
} from '../types/types';
import { calcTotal } from '../utils/functions';

export default class CartStore implements ICart {
  id: string;

  UserId: string;

  foodItems: CartFoodItem[];

  constructor() {
    this.id = 'GUEST';
    this.UserId = '';
    this.foodItems = [];
    makeAutoObservable(this);
  }

  get total() {
    return calcTotal(this.foodItems);
  }

  addItem(obj: CartFoodItem) { // for AddItem.tsx
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
    const { id, UserId } = obj;
    const foodItems = obj.foodItems as CartFoodItem[];
    this.id = id;
    this.UserId = UserId;
    this.foodItems = foodItems;
    localStorage.removeItem('guestCartItems');
  }

  setItems(arr: CartFoodItem[]) {
    this.foodItems = arr;
  }

  setId(str: string) {
    this.id = str;
  }

  unset() {
    this.id = 'GUEST';
    this.UserId = '';
    this.foodItems = [];
  }
}

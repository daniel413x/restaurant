import { makeAutoObservable } from 'mobx';
import {
  IBasket,
} from '../types/types';

export default class BasketStore {
  basket: IBasket;

  constructor() {
    this.basket = {
      foodItems: [],
      id: -1,
    };
    makeAutoObservable(this);
  }

  setBasket(obj: IBasket) {
    this.basket = obj;
  }
}

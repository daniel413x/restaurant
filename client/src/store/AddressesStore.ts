import { makeAutoObservable } from 'mobx';
import {
  IAddress,
} from '../types/types';

export default class UserStore {
  addresses: IAddress[];

  defaultAddress?: IAddress;

  constructor() {
    this.addresses = [];
    makeAutoObservable(this);
  }

  set(arr: IAddress[]) {
    this.addresses = arr;
  }

  unset() {
    this.addresses = [];
  }

  setDefault(obj :IAddress) {
    this.defaultAddress = obj;
  }

  add(obj: IAddress) {
    this.addresses = [...this.addresses, obj];
  }

  deleteAddress(id: string) {
    this.addresses = this.addresses.filter((address) => address.id !== id);
  }

  get all() {
    return this.addresses;
  }
}

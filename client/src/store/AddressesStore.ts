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
    const defaultAddress = this.addresses.find((address: IAddress) => address.isDefault);
    if (defaultAddress) {
      this.setDefault(defaultAddress);
    }
    this.addresses = arr;
  }

  unset() {
    this.addresses = [];
  }

  setDefault(obj :IAddress | undefined) {
    this.defaultAddress = obj;
  }

  addAddress(obj: IAddress) {
    this.addresses = [...this.addresses, obj];
  }

  deleteAddress(id: string) {
    this.addresses = this.addresses.filter((address) => address.id !== id);
  }

  get all() {
    return this.addresses;
  }
}

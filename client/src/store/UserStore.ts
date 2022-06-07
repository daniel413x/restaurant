import { makeAutoObservable } from 'mobx';
import {
  IUser, ICostumerAddress,
} from '../types/types';

export default class UserStore implements IUser {
  isAuth?: boolean;

  isAdmin?: boolean;

  id: number;

  avatar: string;

  name: string;

  email: string;

  addresses: ICostumerAddress[];

  defaultAddress?: ICostumerAddress | null;

  constructor() {
    this.isAuth = true;
    this.isAdmin = true;
    this.id = -1;
    this.name = 'Admin';
    this.avatar = '';
    this.email = '';
    this.addresses = [
      {
        id: 3,
        firstName: 'guest',
        lastName: 'guest',
        addressLineOne: '123 fake street',
        addressLineTwo: '#503',
        city: 'washington',
        zip: '20008',
        state: 'DC',
      },
      {
        id: 4,
        firstName: 'guest',
        lastName: 'guest',
        addressLineOne: '12364 fake street',
        addressLineTwo: '#503',
        city: 'washington',
        zip: '20008',
        state: 'DC',
      },
    ];
    this.defaultAddress = {
      id: 3,
      firstName: 'guest',
      lastName: 'guest',
      addressLineOne: '123 fake street',
      addressLineTwo: '#503',
      city: 'washington',
      zip: '20008',
      state: 'DC',
    };
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(obj: IUser) {
    const {
      isAuth,
      id,
      name,
      avatar,
      email,
      addresses,
      defaultAddress,
    } = obj;
    this.isAuth = isAuth;
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.email = email;
    this.addresses = addresses;
    this.defaultAddress = defaultAddress;
  }

  unsetUser() {
    this.isAuth = false;
    this.isAdmin = false;
    this.id = -1;
    this.name = 'Guest';
    this.avatar = '';
    this.email = '';
    this.addresses = [];
    this.defaultAddress = null;
  }

  setAddresses(arr: ICostumerAddress[]) {
    this.addresses = arr;
  }

  removeAddress(id: number) {
    this.addresses = this.addresses?.filter((address) => address.id !== id);
  }

  setDefaultAddress(obj: ICostumerAddress | null) {
    this.defaultAddress = obj;
  }

  setAvatar(str: string) {
    this.email = str;
  }

  setEmail(str: string) {
    this.email = str;
  }
}

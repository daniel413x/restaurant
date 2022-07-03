import { makeAutoObservable } from 'mobx';
import {
  IUser, IAddress,
} from '../types/types';
import { GUEST } from '../utils/consts';

export default class UserStore implements IUser {
  role: string;

  id: string;

  avatar: string;

  name: string;

  email: string;

  addresses: IAddress[];

  defaultAddress?: IAddress | null;

  constructor() {
    this.role = 'GUEST';
    this.id = '-1';
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
        UserId: 'TEMP',
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
        UserId: 'TEMP',
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
      UserId: 'TEMP',
    };
    makeAutoObservable(this);
  }

  setUser(obj: IUser) {
    const {
      role,
      id,
      name,
      avatar,
      email,
      addresses,
      defaultAddress,
    } = obj;
    this.role = role;
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.email = email;
    this.addresses = addresses || [];
    this.defaultAddress = defaultAddress;
  }

  unsetUser() {
    this.role = GUEST;
    this.id = '-1';
    this.name = 'Guest';
    this.avatar = '';
    this.email = '';
    this.addresses = [];
    this.defaultAddress = null;
  }

  addAddress(obj: IAddress) {
    this.addresses = [...this.addresses, obj];
  }

  removeAddress(id: number) {
    this.addresses = this.addresses?.filter((address) => address.id !== id);
  }

  setDefaultAddress(obj: IAddress | null) {
    this.defaultAddress = obj;
  }

  setAvatar(str: string) {
    this.email = str;
  }

  setEmail(str: string) {
    this.email = str;
  }
}

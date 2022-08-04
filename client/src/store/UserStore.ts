import { makeAutoObservable } from 'mobx';
import {
  IUser, IAddress,
} from '../types/types';
import { ADMIN, GUEST, REGISTERED } from '../utils/consts';

export default class UserStore implements IUser {
  roles: string[];

  id: string;

  avatar: string;

  name: string;

  email: string;

  addresses: IAddress[];

  defaultAddress?: IAddress | null;

  constructor() {
    this.roles = ['GUEST'];
    this.id = 'GUEST';
    this.name = 'Guest';
    this.avatar = '';
    this.email = '';
    this.addresses = [
      {
        id: '3',
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
        id: '4',
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
      id: '3',
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

  set(obj: IUser) {
    const {
      roles,
      id,
      name,
      avatar,
      email,
      addresses,
      defaultAddress,
    } = obj;
    this.roles = roles;
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.email = email;
    this.addresses = addresses || [];
    this.defaultAddress = defaultAddress;
  }

  unset() {
    this.roles = [GUEST];
    this.id = localStorage.getItem('guestId')!;
    this.name = 'Guest';
    this.avatar = '';
    this.email = '';
    this.addresses = [];
    this.defaultAddress = null;
  }

  get isGuest() {
    return this.roles.indexOf(GUEST) >= 0;
  }

  get isRegistered() {
    return this.roles.indexOf(REGISTERED) >= 0;
  }

  get isAdmin() {
    return this.roles.indexOf(ADMIN) >= 0;
  }

  addAddress(obj: IAddress) {
    this.addresses = [...this.addresses, obj];
  }

  removeAddress(id: string) {
    this.addresses = this.addresses?.filter((address) => address.id !== id);
  }

  setDefaultAddress(obj: IAddress | null) {
    this.defaultAddress = obj;
  }

  setId(str: string) {
    this.id = str;
  }

  setAvatar(str: string) {
    this.avatar = str;
  }

  setEmail(str: string) {
    this.email = str;
  }
}

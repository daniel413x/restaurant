import { makeAutoObservable } from 'mobx';
import {
  IUser, ICostumerAddress,
} from '../types/types';

export default class UserStore {
  user: IUser;

  constructor() {
    this.user = {
      isAuth: true,
      name: 'Guest',
      id: -1,
      email: '',
      avatar: '',
      defaultAddress: {
        id: 3,
        firstName: 'guest',
        lastName: 'guest',
        addressLineOne: '123 fake street',
        addressLineTwo: '#503',
        city: 'washington',
        zip: '20008',
        state: 'DC',
      },
      addresses: [
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
      ],
    };
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this.user.isAuth = bool;
  }

  setUser(obj: IUser) {
    this.user = obj;
  }

  unsetUser() {
    this.user = {
      isAuth: false,
      name: 'Guest',
      id: -1,
      email: '',
      avatar: '',
      defaultAddress: null,
      addresses: [],
    };
  }

  setAddresses(arr: ICostumerAddress[]) {
    this.user.addresses = arr;
  }

  removeAddress(id: number) {
    this.user.addresses = this.user.addresses?.filter((address) => address.id !== id);
  }

  setDefaultAddress(obj: ICostumerAddress | null) {
    this.user.defaultAddress = obj;
  }

  setEmail(str: string) {
    this.user.email = str;
  }
}

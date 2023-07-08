import jwt_decode from 'jwt-decode';
import {
  IUser,
  QueryResUserRegistration,
  ICart,
  QueryReqEditUser,
  QueryReqUserRegistration,
  CartFoodItem,
} from '../types/types';
import { $authHost, $host } from './index';

export const registration = async ({
  email,
  password,
  guest,
}: QueryReqUserRegistration): Promise<QueryResUserRegistration> => {
  const { data } = await $host.post('api/user/registration', {
    email,
    password,
    guest,
  });
  localStorage.setItem('registeredToken', data.token);
  const newUser = jwt_decode(data.token) as IUser;
  const newCart = data.cart as ICart;
  return { newUser, newCart };
};

export const registrationGuest = async (email: string, password: string): Promise<IUser> => {
  const { data } = await $authHost.put('api/user/registration/guest', {
    email,
    password,
  });
  localStorage.setItem('registeredToken', data.token);
  const newUser = jwt_decode(data.token) as IUser;
  return newUser;
};

export const login = async (email: string, password: string, guestItems?: CartFoodItem[]): Promise<IUser> => {
  const { data } = await $host.post('api/user/login', { email, password, guestItems });
  localStorage.setItem('registeredToken', data.token);
  return jwt_decode(data.token);
};

export const editUser = async (obj: QueryReqEditUser | FormData): Promise<IUser> => {
  const { data } = await $authHost.put('api/user', obj);
  localStorage.setItem('registeredToken', data.token);
  return jwt_decode(data.token);
};

export const autoAuth = async (): Promise<IUser> => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('registeredToken', data.token);
  return jwt_decode(data.token);
};

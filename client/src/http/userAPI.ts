import jwt_decode from 'jwt-decode';
import {
  IUser,
  QueryResUserRegistration,
  ICart,
  QueryReqUserRegistration,
} from '../types/types';
import { $authHost, $host } from './index';

export const registration = async (email: string, password: string): Promise<QueryResUserRegistration> => {
  const { data } = await $host.post('api/user/registration', { email, password });
  localStorage.setItem('token', data.token);
  const newUser = jwt_decode(data.token) as IUser;
  const newCart = data.cart as ICart;
  return { newUser, newCart };
};

export const login = async (email: string, password: string): Promise<IUser> => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const editUser = async (obj: QueryReqUserRegistration | FormData): Promise<IUser> => {
  const { data } = await $authHost.put('api/user', obj);
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const autoAuth = async (): Promise<IUser> => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

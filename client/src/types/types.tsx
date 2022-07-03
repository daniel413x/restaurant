import { FC } from 'react';

type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IRouterRoute {
  path: string;
  Component: FC;
}

export interface INavbarRoute {
  route: string;
  dataIcon: string;
  tooltip: string;
  tooltipClasses?: string;
}

export interface IAddress {
  id: number;
  firstName: string;
  lastName: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  zip: string;
  state: string;
  UserId?: string;
  saved?: boolean;
  isDefault?: boolean;
}

export type QueryAddress = PartiallyOptional<IAddress, 'id'>;

export interface IUser {
  role: string;
  id: string;
  name: string;
  email: string;
  avatar: string;
  addresses: IAddress[];
  defaultAddress?: IAddress | null;
}

export type QueryUser = {
  email: string;
  password: string;
};

export interface IRegistrationRequest {
  user: QueryUser;
  address?: QueryAddress;
}

export interface IRegistrationResponse {
  newUser: IUser;
  newCart: ICart;
}

export interface ITestimonialUser {
  name: string;
  email: string;
  avatar: string;
}

export interface ITestimonial {
  body: string;
  user: ITestimonialUser;
  id: number;
}

export interface IFoodItem {
  id: number;
  image: string;
  name: string;
  time: number[];
  serves: number;
  price: number;
  discount: number;
  ingredients: string[];
  quantity?: number;
  // calories?
  instructions?: string;
  category?: FoodItemCategory;
}

export type QueryFoodItem = PartiallyOptional<IFoodItem, 'id'>; // sent in POST

export interface IFoodCategory {
  name: string;
  foodItems: IFoodItem[];
  id: number;
}

type FoodItemCategory = Omit<IFoodCategory, 'foodItems'>;

export interface IModalProps {
  onHide: () => void;
  show: boolean;
}

export interface IModalDeletedFoodItem extends IModalProps {
  foodItem: IFoodItem;
}

export interface INotification {
  message?: string;
  color?: string;
  image?: string;
  timeout: number;
  id: number;
}

export interface ICart {
  id: number;
  UserId: string;
  foodItems: IFoodItem[];
}

export interface ITimestampedAction {
  timestamp: string;
  message: string;
}

export interface IOrder {
  id: number;
  UserId: string;
  addressId: number;
  address?: IAddress;
  foodItems: IFoodItem[];
  status: {
    value: number,
    actionLog: ITimestampedAction[],
  };
  date: string;
  total: number;
}

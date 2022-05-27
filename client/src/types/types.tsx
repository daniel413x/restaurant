import { FC } from 'react';

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

export interface ICostumerAddress {
  id: number;
  firstName: string;
  lastName: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  zip: string;
  state: string;
}

export interface IUser {
  isAuth?: boolean;
  id: number;
  name: string;
  email: string;
  avatar: string;
  addresses: ICostumerAddress[];
  defaultAddress?: ICostumerAddress | null;
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
  id?: number;
  image?: string;
  name?: string;
  time?: number[];
  serves?: number;
  price?: number;
  discount?: number;
  ingredients?: string[];
  bootstrapWidth?: number;
  quantity?: number;
  // calories?
  instructions?: string;
}

export interface IFoodCategory {
  name: string;
  foodItems: IFoodItem[];
}

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
  userId: number;
  foodItems: IFoodItem[];
}

export interface ITimestampedAction {
  timestamp: string;
  message: string;
}

export interface IOrder {
  id: number;
  userId: number;
  foodItems: IFoodItem[];
  status: {
    value: number,
    actionLog: ITimestampedAction[],
  };
  date: string;
  total: number;
}

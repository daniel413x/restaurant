import { FC, MouseEventHandler } from 'react';

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

export interface IFoodItemAbbreviated { // FoodItemSupport or FoodItemAuxiliary might be a better label
  id?: number;
  name?: string;
  ingredients?: string[];
  price?: number;
  discount?: number;
  image?: string;
  handleDeleteModal?: MouseEventHandler<HTMLButtonElement>;
}

export interface IFoodItem {
  id?: number;
  image?: string;
  name?: string;
  time: number[];
  serves?: number;
  price: number;
  discount?: number;
  ingredients?: string[];
  bootstrapWidth?: number;
  // calories?
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
  foodItem: IFoodItemAbbreviated;
}

export interface INotification {
  message?: string;
  color?: string;
  image?: string;
  timeout: number;
  id: number;
}

export interface IBasket {
  id: number;
  foodItems: IFoodItem[] | IFoodItemAbbreviated[];
}

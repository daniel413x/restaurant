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
  id: string;
  firstName: string;
  lastName: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  zip: string;
  state: string;
  UserId?: string;
  isDefault?: boolean;
}

export type QueryPOSTReqAddress = PartiallyOptional<IAddress, 'id'>;

export type QueryPUTReqAddress = Partial<PartiallyOptional<IAddress, 'id'>>;

export interface IUser {
  roles: string[];
  id: string;
  name: string;
  email: string;
  avatar: string;
  addresses: IAddress[];
  defaultAddress?: IAddress | null;
}

export type QueryReqUserRegistration = Partial<Omit<IUser, 'id'>> & { password?: string; };

export type QueryResUserRegistration = {
  newUser: IUser;
  newCart: ICart;
};

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
  id: string;
  image: string;
  name: string;
  time: [number, number];
  serves: number;
  price: number;
  discount: number;
  ingredients: string[];
  // calories?
  category?: FoodItemCategory;
}

type OrderOrCartFoodItemSpecificProps = {
  quantity: number;
  instructions?: string;
};

export type OrderOrCartFoodItem = Omit<IFoodItem, 'image' | 'serves'> & OrderOrCartFoodItemSpecificProps;

export type QueryReqMenuFoodItem = PartiallyOptional<IFoodItem, 'id'>;

export type QueryResMenuFoodItem = IFoodItem;

export type QueryReqCartFoodItem = Omit<OrderOrCartFoodItem, 'id'> & { CartId: string };

export interface ICategory {
  name: string;
  foodItems: IFoodItem[];
  id: number;
}

type FoodItemCategory = Omit<ICategory, 'foodItems'>;

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
  id: string;
  UserId: string;
  foodItems: OrderOrCartFoodItem[];
}

export interface ITimestampedAction {
  timestamp: string;
  message: string;
}

export interface IOrder {
  id: string;
  UserId: string;
  address?: IAddress;
  foodItems: OrderOrCartFoodItem[];
  status: number;
  actionLog: [string, string][]; // first index is date, second is message
  activeOrder?: boolean;
  date: string;
  total: number;
}

type QueryOrderAddress = Omit<IAddress, 'id' | 'UserId' | 'isDefault'> & {
  selectedAddressId?: string
};

export type QueryReqSubmitOrder = {
  UserId: string;
  CartId: string;
  address: string | QueryOrderAddress;
};

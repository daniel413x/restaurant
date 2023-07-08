import { FC, ReactElement } from 'react';

type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;

export interface IRouterRoute {
  path: string;
  Component: FC;
}

export type Children = ReactElement | string | false | undefined | number | (ReactElement | string | false | undefined | number)[];

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

export type QueryReqEditUser = Partial<Omit<IUser, 'id'>> & { password?: string; };

export type NormalRegistration = {
  email: string;
  password: string;
};

export type GuestRegistration = {
  guest: boolean
};

export type QueryReqUserRegistration = Either<NormalRegistration, GuestRegistration>;

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
  CategoryId: string;
}

type OrderOrCartFoodItemSpecificProps = {
  quantity: number;
  instructions?: string;
};

export type OrderOrCartFoodItem = Omit<IFoodItem, 'image' | 'serves' | 'CategoryId'> & OrderOrCartFoodItemSpecificProps;

export type CartFoodItem = Omit<IFoodItem, 'image' | 'serves' | 'CategoryId'> & OrderOrCartFoodItemSpecificProps & { UserId: string; };

export type QueryReqMenuFoodItem = Omit<PartiallyOptional<IFoodItem, 'id'>, 'image' | 'category'> & {
  image: File;
  CategoryId: string;
};

export type QueryResMenuFoodItem = IFoodItem;

export type QueryReqCartFoodItem = Omit<CartFoodItem, 'id'> & {
  CartId: string
};

export interface ICategory {
  name: string;
  foodItems: IFoodItem[];
  id: string;
  public: boolean;
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

export interface ICategoriesSorter { // related to backend Options model, meant to handle categories sorting and maybe sorting of other things like front page elements
  id: string;
  array: string[];
}

export type QueryReqUpdateOptions = {
  name?: string;
  array?: string[];
  number?: number;
  string?: string;
  boolean?: boolean;
};

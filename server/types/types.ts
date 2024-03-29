import { Model, Sequelize } from 'sequelize';

export interface ICategory {
  id: string;
  name: string;
  public: boolean;
}

export interface Db {
  [key: string]: Model | Sequelize | typeof Sequelize;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
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
}

export interface IAddressForOrder extends IAddress {
  OrderId: string;
}

export interface IAddressInAddressBook extends IAddress {
  UserId: string;
  isDefault?: boolean;
}

export type Roles = 'GUEST' | 'REGISTERED' | 'ADMIN';

export interface IUser {
  id: string;
  roles: Roles[];
  name?: string;
  email: string;
  password: string;
  avatar?: string;
  addresses?: IAddressInAddressBook[];
}

export interface IFoodItem {
  id: string;
  name: string;
  price: string;
}

export interface IFoodItemInMenu extends IFoodItem {
  image: string;
  time: [number, number];
  serves: number;
  discount?: string;
  ingredients: string[];
  CategoryId: string;
  category?: ICategory;
}

export interface IFoodItemInCart extends IFoodItem {
  time: [number, number];
  discount?: string;
  ingredients: string[];
  CartId: string;
  instructions?: string;
  quantity: number;
}

export interface IOrder {
  id: string;
  UserId?: string;
  address?: IAddressForOrder;
  time: [number, number];
  foodItems?: IFoodItem[];
  status: number;
  activeOrder: boolean;
  date: string;
  total: number;
  actionLog: [string, string][];
}

export interface IRegisteredOrder {
}

export type OrderCreationAttributes = Omit<IOrder, 'id' | 'address' | 'foodItems'>;

export interface ICart {
  id?: string;
  userId: string;
  foodItems?: IFoodItem[];
}

export interface ICategory {
  id: string;
  name: string;
  publicCategory: boolean;
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

export interface IUser {
  id: string;
  role: string;
  name?: string;
  email: string;
  password: string;
  avatar?: string;
  addresses?: IAddressInAddressBook[];
}

export interface IFoodItem {
  id: string;
  name: string;
  price: number;
}

export interface IFoodItemInMenu extends IFoodItem {
  image: string;
  time: [number, number];
  serves: number;
  discount?: number;
  ingredients: string[];
  CategoryId: string;
  category?: ICategory;
}

export interface IOrder {
  id: string;
  UserId: string;
  AddressForOrderId: string;
  address?: IAddressForOrder;
  time: [number, number];
  foodItems?: IFoodItem[];
  status: number;
  activeOrder: boolean;
  date: string;
  total: number;
  actionLog: [string, string][];
}

export interface ICart {
  id?: string;
  userId: string;
  foodItems?: IFoodItem[];
}

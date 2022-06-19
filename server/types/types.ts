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
  addressLineTwo: string;
  city: string;
  zip: string;
  state: string;
  isDefault?: boolean;
}

export interface IUser {
  id: string;
  role: string;
  name?: string;
  email: string;
  password: string;
  avatar?: string;
  addresses?: IAddress[];
}

export interface IFoodItem {
  id: string;
  name: string;
  price: number;
}

export interface IOrder {
  id: string;
  userId: string;
  addressId: string;
  address: IAddress;
  foodItems: IFoodItem[];
}

export interface ITimestampedAction {
  timestamp: string;
  message: string;
}

export interface ICart {
  id?: string;
  userId: string;
  foodItems?: IFoodItem[];
}

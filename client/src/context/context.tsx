import { createContext } from 'react';
import NotificationStore from '../store/NotificationStore';
import UserStore from '../store/UserStore';
import CartStore from '../store/CartStore';
import CategoriesStore from '../store/CategoriesStore';
import OrdersStore from '../store/OrdersStore';
import AdminStore from '../store/AdminStore';
import AddressesStore from '../store/AddressesStore';

interface ContextProps {
  notifications: NotificationStore;
  user: UserStore;
  cart: CartStore;
  categories: CategoriesStore;
  orders: OrdersStore;
  admin: AdminStore;
  addresses: AddressesStore;
}

const Context = createContext<ContextProps>({
  notifications: new NotificationStore(),
  user: new UserStore(),
  cart: new CartStore(),
  categories: new CategoriesStore(),
  orders: new OrdersStore(),
  admin: new AdminStore(),
  addresses: new AddressesStore(),
});

export default Context;

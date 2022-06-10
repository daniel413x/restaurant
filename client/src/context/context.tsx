import { createContext } from 'react';
import NotificationStore from '../store/NotificationStore';
import UserStore from '../store/UserStore';
import CartStore from '../store/CartStore';
import CategoriesStore from '../store/CategoriesStore';
import OrdersStore from '../store/OrdersStore';
import AdminStore from '../store/AdminStore';

interface ContextProps {
  notifications: NotificationStore;
  user: UserStore;
  cart: CartStore;
  categories: CategoriesStore;
  orders: OrdersStore;
  admin: AdminStore;
}

const Context = createContext<ContextProps>({
  notifications: new NotificationStore(),
  user: new UserStore(),
  cart: new CartStore(),
  categories: new CategoriesStore(),
  orders: new OrdersStore(),
  admin: new AdminStore(),
});

export default Context;

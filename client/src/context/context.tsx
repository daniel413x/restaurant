import { createContext } from 'react';
import NotificationStore from '../store/NotificationStore';
import UserStore from '../store/UserStore';
import CartStore from '../store/CartStore';
import CategoriesStore from '../store/CategoriesStore';
import OrdersStore from '../store/OrdersStore';

interface ContextProps {
  notifications: NotificationStore;
  user: UserStore;
  cart: CartStore;
  categories: CategoriesStore;
  orders: OrdersStore;
}

const Context = createContext<ContextProps>({
  notifications: new NotificationStore(),
  user: new UserStore(),
  cart: new CartStore(),
  categories: new CategoriesStore(),
  orders: new OrdersStore(),
});

export default Context;

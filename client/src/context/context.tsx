import { createContext } from 'react';
import NotificationStore from '../store/NotificationStore';
import UserStore from '../store/UserStore';
import CartStore from '../store/CartStore';
import CategoriesStore from '../store/CategoriesStore';

interface ContextProps {
  notifications: NotificationStore;
  user: UserStore;
  cart: CartStore;
  categories: CategoriesStore;
}

const Context = createContext<ContextProps>({
  notifications: new NotificationStore(),
  user: new UserStore(),
  cart: new CartStore(),
  categories: new CategoriesStore(),
});

export default Context;

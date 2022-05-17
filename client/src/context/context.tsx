import { createContext } from 'react';
import NotificationStore from '../store/NotificationStore';
import UserStore from '../store/UserStore';
import BasketStore from '../store/BasketStore';
import CategoriesStore from '../store/CategoriesStore';

interface ContextProps {
  notifications: NotificationStore;
  user: UserStore;
  basket: BasketStore;
  categories: CategoriesStore;
}

const Context = createContext<ContextProps>({
  notifications: new NotificationStore(),
  user: new UserStore(),
  basket: new BasketStore(),
  categories: new CategoriesStore(),
});

export default Context;

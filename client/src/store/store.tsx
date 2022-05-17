import NotificationStore from './NotificationStore';
import UserStore from './UserStore';
import BasketStore from './BasketStore';
import CategoriesStore from './CategoriesStore';

const store = {
  notifications: new NotificationStore(),
  user: new UserStore(),
  basket: new BasketStore(),
  categories: new CategoriesStore(),
};

export default store;

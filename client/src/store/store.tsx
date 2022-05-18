import NotificationStore from './NotificationStore';
import UserStore from './UserStore';
import CartStore from './CartStore';
import CategoriesStore from './CategoriesStore';

const store = {
  notifications: new NotificationStore(),
  user: new UserStore(),
  cart: new CartStore(),
  categories: new CategoriesStore(),
};

export default store;

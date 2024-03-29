import NotificationStore from './NotificationStore';
import UserStore from './UserStore';
import CartStore from './CartStore';
import CategoriesStore from './CategoriesStore';
import OrdersStore from './OrdersStore';
import AdminStore from './AdminStore';
import AddressesStore from './AddressesStore';

const store = {
  notifications: new NotificationStore(),
  user: new UserStore(),
  cart: new CartStore(),
  categories: new CategoriesStore(),
  orders: new OrdersStore(),
  admin: new AdminStore(),
  addresses: new AddressesStore(),
};

export default store;

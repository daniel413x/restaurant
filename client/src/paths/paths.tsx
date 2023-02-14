import Admin from '../pages/Admin';
import Orders from '../pages/Orders';
import Cart from '../pages/Cart';
import Menu from '../pages/Menu';
import Auth from '../pages/Auth';
import GuestOrder from '../pages/GuestOrder';
import FrontPage from '../pages/FrontPage';
import Account from '../pages/Account';
import EditMenu from '../pages/EditMenu';
import AccountDetails from '../pages/AccountDetails';
import EditedFoodItem from '../pages/EditedFoodItem';
import AdminOrders from '../pages/AdminOrders';
import * as routes from '../utils/consts';

export const indexAuthedRoutes = [
  {
    path: routes.ADMIN_WILDCARD_ROUTE,
    Component: Admin,
  },
  {
    path: routes.ACCOUNT_WILDCARD_ROUTE,
    Component: Account,
  },
];

export const indexPublicRoutes = [
  {
    path: `${routes.DEMO_ROUTE}/${routes.EDIT_ROUTE}${routes.MENU_ROUTE}`,
    Component: EditMenu,
  },
  {
    path: routes.CART_ROUTE,
    Component: Cart,
  },
  {
    path: routes.LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: routes.REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: routes.MENU_ROUTE,
    Component: Menu,
  },
  {
    path: `${routes.GUEST_ROUTE}/${routes.ORDERS_ROUTE}`,
    Component: GuestOrder,
  },
  {
    path: routes.INDEX_ROUTE,
    Component: FrontPage,
  },
];

export const accountRoutes = [
  {
    path: routes.ACCOUNT_DETAILS_ROUTE,
    Component: AccountDetails,
  },
  {
    path: routes.ORDERS_ROUTE,
    Component: Orders,
  },
  {
    path: routes.INDEX_ROUTE,
    Component: Orders,
  },
];

export const adminRoutes = [
  {
    path: routes.ORDERS_ROUTE,
    Component: AdminOrders,
  },
  {
    path: routes.MENU_ROUTE,
    Component: EditMenu,
  },
  {
    path: `${routes.MENU_ROUTE}/${routes.ADMIN_FOOD_ITEMS_ROUTE}/:id`,
    Component: EditedFoodItem,
  },
  {
    path: routes.INDEX_ROUTE,
    Component: AdminOrders,
  },
];

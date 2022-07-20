import Admin from '../pages/Admin';
import Orders from '../pages/Orders';
import Cart from '../pages/Cart';
import Menu from '../pages/Menu';
import Logout from '../pages/Logout';
import Auth from '../pages/Auth';
import GuestOrder from '../pages/GuestOrder';
import FrontPage from '../pages/FrontPage';
import Account from '../pages/Account';
import EditMenu from '../pages/EditMenu';
import AccountDetails from '../pages/AccountDetails';
import foodImage from '../assets/about-us-5.png';
import imageFour from '../assets/about-us-4.png';
import imageSix from '../assets/about-us-6.png';
import AdminOrders from '../pages/AdminOrders';
import { IFoodItem } from '../types/types';
import EditedFoodItem from '../pages/EditedFoodItem';

export const ACCOUNT_INDEX_ROUTE = '/*';
export const ACCOUNT_ROUTE = 'account/*';
export const ACCOUNT_DETAILS_ROUTE = 'details';
export const ACCOUNT_ORDERS_ROUTE = 'orders';
export const ADMIN_INDEX_ROUTE = 'admin/*';
export const ADMIN_ROUTE = '/admin';
export const ADMIN_CATEGORIES_ROUTE = 'categories';
export const ADMIN_FOOD_ITEMS_ROUTE = 'fooditems';
export const ADMIN_ORDERS_ROUTE = 'orders';
export const LOGIN_ROUTE = 'login';
export const LOGOUT_ROUTE = 'logout';
export const REGISTRATION_ROUTE = 'registration';
export const FRONT_PAGE_ROUTE = '/*';
export const MENU_ROUTE = 'menu';
export const CART_ROUTE = 'cart';
export const ORDERS_ROUTE = 'orders';
export const GUEST_ROUTE = 'guest';
export const ADMIN = 'ADMIN';
export const GUEST = 'GUEST'; // must manually change this.role = 'GUEST'; in UserStore
export const REGISTERED = 'REGISTERED';
export const green = 'green';
export const red = 'red';
export const shortNotification = 4000;
export const longNotification = 6000;

export const indexAuthedRoutes = [
  {
    path: ADMIN_INDEX_ROUTE,
    Component: Admin,
  },
  {
    path: ACCOUNT_ROUTE,
    Component: Account,
  },
  {
    path: LOGOUT_ROUTE,
    Component: Logout,
  },
];

export const indexPublicRoutes = [
  {
    path: FRONT_PAGE_ROUTE,
    Component: FrontPage,
  },
  {
    path: CART_ROUTE,
    Component: Cart,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: MENU_ROUTE,
    Component: Menu,
  },
  {
    path: `${GUEST_ROUTE}/${ORDERS_ROUTE}/:id`,
    Component: GuestOrder,
  },
];

export const accountRoutes = [
  {
    path: ACCOUNT_DETAILS_ROUTE,
    Component: AccountDetails,
  },
  {
    path: ACCOUNT_ORDERS_ROUTE,
    Component: Orders,
  },
  {
    path: ACCOUNT_INDEX_ROUTE,
    Component: Orders,
  },
];

export const adminRoutes = [
  {
    path: ADMIN_ORDERS_ROUTE,
    Component: AdminOrders,
  },
  {
    path: MENU_ROUTE,
    Component: EditMenu,
  },
  {
    path: `${MENU_ROUTE}/${ADMIN_FOOD_ITEMS_ROUTE}/:id`,
    Component: EditedFoodItem,
  },
  {
    path: ACCOUNT_INDEX_ROUTE,
    Component: AdminOrders,
  },
];

export const demoFoodItems: IFoodItem[] = [
  {
    name: 'Rainbow Vegetable Sandwich',
    ingredients: ['rice', 'nuts', 'spices', 'olive oil', 'lemon juice'],
    price: 9.50,
    image: imageFour,
    time: [15, 20],
    serves: 1,
    discount: 0.1,
    id: '1',
    CategoryId: '3',
  },
  {
    name: 'Vegetarian Burger',
    ingredients: ['rice', 'nuts', 'spices', 'olive oil', 'lemon juice'],
    price: 9.20,
    image: foodImage,
    time: [30, 45],
    serves: 1,
    discount: 0.1,
    id: '1',
    CategoryId: '3',
  },
  {
    name: 'Raspberry Stuffed French Toast',
    ingredients: ['rice', 'nuts', 'spices', 'olive oil', 'lemon juice'],
    price: 13.20,
    image: imageSix,
    time: [15, 20],
    serves: 1,
    discount: 0.1,
    id: '1',
    CategoryId: '3',
  },
];

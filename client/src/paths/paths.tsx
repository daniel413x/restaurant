import { lazy } from 'react';
import * as routes from '../utils/consts';

const Admin = lazy(() => import('../pages/Admin'));
const Orders = lazy(() => import('../pages/Orders'));
const Cart = lazy(() => import('../pages/Cart'));
const Menu = lazy(() => import('../pages/Menu'));
const Auth = lazy(() => import('../pages/Auth'));
const GuestOrder = lazy(() => import('../pages/GuestOrder'));
const FrontPage = lazy(() => import('../pages/FrontPage'));
const Account = lazy(() => import('../pages/Account'));
const EditMenu = lazy(() => import('../pages/EditMenu'));
const AccountDetails = lazy(() => import('../pages/AccountDetails'));
const EditedFoodItem = lazy(() => import('../pages/EditedFoodItem'));
const AdminOrders = lazy(() => import('../pages/AdminOrders'));

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

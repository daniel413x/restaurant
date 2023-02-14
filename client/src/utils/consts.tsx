import foodImage from '../assets/about-us-5.png';
import imageFour from '../assets/about-us-4.png';
import imageSix from '../assets/about-us-6.png';
import { IFoodItem } from '../types/types';

export const INDEX_ROUTE = '/*';
export const ACCOUNT_WILDCARD_ROUTE = 'account/*';
export const ACCOUNT_ROUTE = '/account';
export const ACCOUNT_DETAILS_ROUTE = 'details';
export const ADMIN_WILDCARD_ROUTE = 'admin/*';
export const ADMIN_ROUTE = '/admin';
export const ADMIN_FOOD_ITEMS_ROUTE = 'fooditems';
export const LOGIN_ROUTE = 'login';
export const LOGOUT_ROUTE = 'logout';
export const REGISTRATION_ROUTE = 'registration';
export const FRONT_PAGE_ROUTE = '/';
export const EDIT_ROUTE = 'edit';
export const MENU_ROUTE = 'menu';
export const CART_ROUTE = 'cart';
export const ORDERS_ROUTE = 'orders';
export const GUEST_ROUTE = 'guest';
export const DEMO_ROUTE = 'demo';
export const ADMIN = 'ADMIN';
export const GUEST = 'GUEST';
export const REGISTERED = 'REGISTERED';
export const green = 'green';
export const red = 'red';
export const shortNotification = 4000;
export const longNotification = 6000;

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
    ingredients: ['rice', 'nuts', 'spices', 'olive oil', 'lemon juice', 'nuts', 'spices'],
    price: 13.20,
    image: imageSix,
    time: [15, 20],
    serves: 1,
    discount: 0.1,
    id: '1',
    CategoryId: '3',
  },
];

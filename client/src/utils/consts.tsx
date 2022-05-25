import Admin from '../pages/Admin';
import Orders from '../pages/Orders';
import Cart from '../pages/Cart';
import Menu from '../pages/Menu';
import Auth from '../pages/Auth';
import GuestOrder from '../pages/GuestOrder';
import FrontPage from '../pages/FrontPage';
import Account from '../pages/Account';
import AccountDetails from '../pages/AccountDetails';
import foodImage from '../assets/about-us-5.png';
import categoryPlaceholder from '../assets/menu-appetizers.png';
import { timestamp } from './functions';

export const ADMIN_ROUTE = 'admin';
export const LOGIN_ROUTE = 'login';
export const REGISTRATION_ROUTE = 'registration';
export const FRONT_PAGE_ROUTE = '/*';
export const INDEX_ROUTE = '/*';
export const MENU_ROUTE = 'menu';
export const CART_ROUTE = 'cart';
export const ACCOUNT_ROUTE = 'account/*';
export const ACCOUNT_DETAILS_ROUTE = 'details';
export const ACCOUNT_ORDERS_ROUTE = 'orders';
export const ORDERS_ROUTE = 'orders';
export const GUEST_ROUTE = 'guest';
export const green = 'green';
export const red = 'red';
export const shortNotification = 4000;

export const indexAuthedRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: ACCOUNT_ROUTE,
    Component: Account,
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
    Component: Auth,
  },
  {
    path: INDEX_ROUTE,
    Component: Orders,
  },
];

export const categoriesPlaceholders = [
  {
    name: 'Appetizers',
    image: categoryPlaceholder,
    foodItems: [
      {
        name: 'Grape Leaves',
        ingredients: ['rice', 'nuts', 'spices', 'olive oil', 'lemon juice'],
        price: 6.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
        id: 1,
      },
      {
        name: 'Parsley Tabbuleh',
        ingredients: ['cucumber', 'tomato', 'sea salt', 'parsley', 'mint', 'green onion'],
        price: 6.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
        id: 2,
      },
      {
        name: 'Hummus',
        ingredients: ['chickpeas', 'tahini', 'lemon', 'olive oil'],
        price: 4.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
        id: 3,
      },
      {
        name: 'Hummus Platter',
        ingredients: ['hummus', 'crackers', 'celery', 'carrots', 'tomatoes'],
        price: 6.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
        id: 4,
      },
      {
        name: 'Fresh Mozzarella Platter',
        ingredients: ['mozzarella', 'tomatoes', 'olives'],
        price: 6.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
        id: 5,
      },
    ],
  },
  {
    name: 'Breakfast',
    image: categoryPlaceholder,
    foodItems: [
      {
        name: 'Grape Leaves',
        ingredients: ['rice', 'nuts', 'spices', 'olive oil', 'lemon juice'],
        price: 6.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
      },
      {
        name: 'Parsley Tabbuleh',
        ingredients: ['cucumber', 'tomato', 'sea salt', 'parsley', 'mint', 'green onion'],
        price: 6.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
      },
      {
        name: 'Hummus',
        ingredients: ['chickpeas', 'tahini', 'lemon', 'olive oil'],
        price: 4.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
      },
      {
        name: 'Hummus Platter',
        ingredients: ['hummus', 'crackers', 'celery', 'carrots', 'tomatoes'],
        price: 6.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
      },
      {
        name: 'Fresh Mozzarella Platter',
        ingredients: ['mozzarella', 'tomatoes', 'olives'],
        price: 6.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
      },
    ],
  },
  {
    name: 'Lunch',
    image: categoryPlaceholder,
    foodItems: [
      {
        name: 'Grape Leaves',
        ingredients: ['rice', 'nuts', 'spices', 'olive oil', 'lemon juice'],
        price: 6.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
      },
      {
        name: 'Parsley Tabbuleh',
        ingredients: ['cucumber', 'tomato', 'sea salt', 'parsley', 'mint', 'green onion'],
        price: 6.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
      },
      {
        name: 'Hummus',
        ingredients: ['chickpeas', 'tahini', 'lemon', 'olive oil'],
        price: 4.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
      },
      {
        name: 'Hummus Platter',
        ingredients: ['hummus', 'crackers', 'celery', 'carrots', 'tomatoes'],
        price: 6.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
      },
      {
        name: 'Fresh Mozzarella Platter',
        ingredients: ['mozzarella', 'tomatoes', 'olives'],
        price: 6.99,
        image: foodImage,
        time: [10, 15],
        serves: 1,
        discount: 0.1,
      },
    ],
  },
];

export const placeholderOrder = {
  id: 5,
  userId: -1,
  status: {
    value: 0,
    actionLog: [
      {
        timestamp: timestamp(),
        message: 'Order received',
      },
    ],
  },
  foodItems: [
    {
      name: 'Parsley Tabbuleh',
      ingredients: ['cucumber', 'tomato', 'sea salt', 'parsley', 'mint', 'green onion'],
      price: 6.99,
      image: foodImage,
      time: [10, 15],
      serves: 1,
      discount: 0.1,
      id: 2,
      quantity: 1,
    },
    {
      name: 'Hummus',
      ingredients: ['chickpeas', 'tahini', 'lemon', 'olive oil'],
      price: 4.99,
      image: foodImage,
      time: [10, 15],
      serves: 1,
      discount: 0.1,
      id: 3,
      quantity: 1,
      instructions: 'no pickles',
    },
  ],
};

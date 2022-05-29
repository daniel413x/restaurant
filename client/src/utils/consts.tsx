import Admin from '../pages/Admin';
import Orders from '../pages/Orders';
import Cart from '../pages/Cart';
import Menu from '../pages/Menu';
import Auth from '../pages/Auth';
import GuestOrder from '../pages/GuestOrder';
import FrontPage from '../pages/FrontPage';
import Account from '../pages/Account';
import AddEditCategories from '../pages/AddEditCategories';
import AccountDetails from '../pages/AccountDetails';
import foodImage from '../assets/about-us-5.png';
import imageFour from '../assets/about-us-4.png';
import imageSix from '../assets/about-us-6.png';
import categoryPlaceholder from '../assets/menu-appetizers.png';
import { actionTimestamp, orderDate } from './functions';

export const ACCOUNT_INDEX_ROUTE = '/*';
export const ACCOUNT_ROUTE = 'account/*';
export const ACCOUNT_DETAILS_ROUTE = 'details';
export const ACCOUNT_ORDERS_ROUTE = 'orders';
export const ADMIN_ROUTE = 'admin/*';
export const ADMIN_INDEX_ROUTE = '/admin';
export const ADMIN_CATEGORIES_ROUTE = 'categories';
export const ADMIN_FOOD_ITEMS_ROUTE = 'fooditems';
export const ADMIN_ORDERS_ROUTE = 'orders';
export const LOGIN_ROUTE = 'login';
export const REGISTRATION_ROUTE = 'registration';
export const FRONT_PAGE_ROUTE = '/*';
export const MENU_ROUTE = 'menu';
export const CART_ROUTE = 'cart';
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
    Component: Orders,
  },
  {
    path: ACCOUNT_INDEX_ROUTE,
    Component: Orders,
  },
];

export const adminRoutes = [
  {
    path: ADMIN_CATEGORIES_ROUTE,
    Component: AddEditCategories,
  },
  {
    path: ADMIN_ORDERS_ROUTE,
    Component: AccountDetails,
  },
  {
    path: ADMIN_FOOD_ITEMS_ROUTE,
    Component: Auth,
  },
  {
    path: ACCOUNT_INDEX_ROUTE,
    Component: AccountDetails,
  },
];

export const demoFoodItems = [
  {
    name: 'Rainbow Vegetable Sandwich',
    ingredients: ['rice', 'nuts', 'spices', 'olive oil', 'lemon juice'],
    price: 9.50,
    image: imageFour,
    time: [15, 20],
    serves: 1,
    discount: 0.1,
    id: 1,
  },
  {
    name: 'Vegetarian Burger',
    ingredients: ['rice', 'nuts', 'spices', 'olive oil', 'lemon juice'],
    price: 9.20,
    image: foodImage,
    time: [30, 45],
    serves: 1,
    discount: 0.1,
    id: 1,
  },
  {
    name: 'Raspberry Stuffed French Toast',
    ingredients: ['rice', 'nuts', 'spices', 'olive oil', 'lemon juice'],
    price: 13.20,
    image: imageSix,
    time: [15, 20],
    serves: 1,
    discount: 0.1,
    id: 1,
  },
];

export const categoriesPlaceholders = [
  {
    id: 0,
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
    id: 1,
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
    id: 2,
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

export const testActiveOrder = {
  id: 5,
  userId: -1,
  status: {
    value: 0,
    actionLog: [
      {
        timestamp: actionTimestamp(),
        message: 'Order received',
      },
    ],
  },
  date: orderDate(),
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
  total: 10.78,
};

export const testPreviousOrders = [
  {
    id: 6,
    userId: -1,
    status: {
      value: 0,
      actionLog: [],
    },
    date: orderDate(),
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
    total: 10.78,
  },
  {
    id: 7,
    userId: -1,
    status: {
      value: 0,
      actionLog: [],
    },
    date: orderDate(),
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
    total: 10.78,
  },
  {
    id: 8,
    userId: -1,
    status: {
      value: 0,
      actionLog: [],
    },
    date: orderDate(),
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
    total: 10.78,
  },
];

import { v4 as uuidv4 } from 'uuid';
import {
  cartForUserWithCartItems,
  cartForUserWithCartItemsAndOrder,
} from '../utils/consts';

export const foodItemForUserWithCartItems = uuidv4();
export const foodItemForUserWithCartItemsTwo = uuidv4();
export const foodItemForUserWithCartItemsAndOrder = uuidv4();

export default {
  up: (queryInterface) => queryInterface.bulkInsert('FoodItemInCart', [
    {
      id: foodItemForUserWithCartItems,
      CartId: cartForUserWithCartItems,
      name: 'Raspberry Stuffed French Toast',
      discount: 0.1,
      price: 13.20,
      time: [15, 20],
      ingredients: ['raspberry', 'vanilla ice cream', 'maple syrup'],
      quantity: 1,
      instructions: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: foodItemForUserWithCartItemsTwo,
      CartId: cartForUserWithCartItems,
      name: 'Sweet Potato Hash',
      discount: 0.15,
      price: 6.99,
      time: [15, 20],
      ingredients: ['sweet potatoes', 'onions', 'peppers', 'garlic', 'paprika'],
      quantity: 1,
      instructions: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: foodItemForUserWithCartItemsAndOrder,
      CartId: cartForUserWithCartItemsAndOrder,
      name: 'Raspberry Stuffed French Toast',
      discount: 0.1,
      price: 13.20,
      time: [15, 20],
      ingredients: ['raspberry', 'vanilla ice cream', 'maple syrup'],
      quantity: 1,
      instructions: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('FoodItemInCart', null, {}),
};

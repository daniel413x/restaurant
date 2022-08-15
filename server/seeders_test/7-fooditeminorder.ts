import {
  orderForUserWithOrder,
  orderForUserWithCartItemsAndOrder,
  foodItemForUserWithOrder,
  foodItemForUserWithOrderTwo,
  foodItemForUserWithCartItemsAndOrder,
} from '../utils/consts';

export default {
  up: (queryInterface) => queryInterface.bulkInsert('FoodItemInOrder', [
    {
      id: foodItemForUserWithOrder,
      OrderId: orderForUserWithOrder,
      name: 'Raspberry Stuffed French Toast',
      discount: 0.1,
      price: 13.20,
      ingredients: ['raspberry', 'vanilla ice cream', 'maple syrup'],
      quantity: 1,
      instructions: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: foodItemForUserWithOrderTwo,
      OrderId: orderForUserWithOrder,
      name: 'Sweet Potato Hash',
      discount: 0.15,
      price: 6.99,
      ingredients: ['sweet potatoes', 'onions', 'peppers', 'garlic', 'paprika'],
      quantity: 1,
      instructions: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: foodItemForUserWithCartItemsAndOrder,
      OrderId: orderForUserWithCartItemsAndOrder,
      name: 'Sweet Potato Hash',
      discount: 0.15,
      price: 6.99,
      ingredients: ['sweet potatoes', 'onions', 'peppers', 'garlic', 'paprika'],
      quantity: 1,
      instructions: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('FoodItemInOrder', null, {}),
};

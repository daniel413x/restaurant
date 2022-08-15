import { v4 as uuidv4 } from 'uuid';

export const uncategorized = uuidv4();
export const appetizers = uuidv4();
export const breakfast = uuidv4();
export const lunch = uuidv4();
export const dessert = uuidv4();

export default {
  up: (queryInterface) => queryInterface.bulkInsert('Category', [
    {
      name: 'Uncategorized',
      id: uncategorized,
      public: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Appetizers',
      id: appetizers,
      public: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Breakfast',
      id: breakfast,
      public: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Lunch',
      id: lunch,
      public: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Dessert',
      id: dessert,
      public: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  /*
    await queryInterface.bulkInsert('FoodItemInMenu', [
      {
        name: 'Grape Leaves',
        ingredients: ['rice', 'nuts', 'spices', 'olive oil', 'lemon juice'],
        price: 6.99,
        image: '0f7eb1b7-6c53-4785-a199-f0516c499453.jpg',
        time: [10, 15],
        serves: 1,
        discount: 0.1,
        CategoryId: appetizers,
        id: uuidv4(),
      },
      {
        name: 'Parsley Tabbuleh',
        ingredients: ['cucumber', 'tomato', 'sea salt', 'parsley', 'mint', 'green onion'],
        price: 6.99,
        image: '0f7eb1b7-6c53-4785-a199-f0516c499453.jpg',
        time: [10, 15],
        serves: 1,
        discount: 0.1,
        CategoryId: appetizers,
        id: uuidv4(),
      },
      {
        name: 'Hummus',
        ingredients: ['chickpeas', 'tahini', 'lemon', 'olive oil'],
        price: 4.99,
        image: '0f7eb1b7-6c53-4785-a199-f0516c499453.jpg',
        time: [10, 15],
        serves: 1,
        discount: 0.1,
        CategoryId: appetizers,
        id: uuidv4(),
      },
      {
        name: 'Pumpkin Paleo Pancakes',
        ingredients: ['honey', 'pumpkin puree', 'salt', 'cinnamon'],
        price: 6.99,
        image: '0f7eb1b7-6c53-4785-a199-f0516c499453.jpg',
        time: [15, 20],
        serves: 1,
        discount: 0.10,
        CategoryId: breakfast,
        id: uuidv4(),
      },
      {
        name: 'Sweet Potato Hash',
        ingredients: ['sweet potatoes', 'onions', 'peppers', 'garlic', 'paprika'],
        price: 6.99,
        image: '0f7eb1b7-6c53-4785-a199-f0516c499453.jpg',
        time: [10, 15],
        serves: 1,
        discount: 0.15,
        CategoryId: breakfast,
        id: uuidv4(),
      },
      {
        name: 'Rainbow Vegetable Sandwich',
        discount: 0.1,
        price: 9.50,
        image: '0f7eb1b7-6c53-4785-a199-f0516c499453.jpg',
        ingredients: ['cream cheese', 'arugula', 'cucumber', 'alfalfa sprouts', 'avocado', 'bell pepper', 'shredded carrots'],
        serves: 1,
        time: [15, 20],
        CategoryId: lunch,
        id: uuidv4(),
      },
      {
        name: 'Vegetarian Burger',
        discount: 0.1,
        price: 9.20,
        image: '0f7eb1b7-6c53-4785-a199-f0516c499453.jpg',
        ingredients: ['mushrooms', 'carrot', 'broccoli florets', 'onion', 'garlic cloves', 'smoked paprika', 'chili powder'],
        serves: 1,
        time: [30, 45],
        CategoryId: lunch,
        id: uuidv4(),
      },
      {
        name: 'Raspberry Stuffed French Toast',
        discount: 0.1,
        price: 13.20,
        image: '0f7eb1b7-6c53-4785-a199-f0516c499453.jpg',
        ingredients: ['raspberry', 'vanilla ice cream', 'maple syrup'],
        serves: 1,
        time: [15, 20],
        CategoryId: dessert,
        id: uuidv4(),
      },
    ]);
    */
  down: (queryInterface) => queryInterface.bulkDelete('Category', null, {}),
};

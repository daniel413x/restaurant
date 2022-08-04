import { v4 as uuidv4 } from 'uuid';
import Category from '../db/models/Category';

export default {
  up: async (queryInterface) => {
    const lunch = await Category.findOne({ where: { name: 'Lunch' } });
    queryInterface.bulkInsert('FoodItemInMenu', [
      {
        name: 'Sandwich',
        discount: 0.1,
        price: 10.99,
        image: '46b7363d-eb80-4b48-a9d4-4ec8bdefe9a6.jpg',
        ingredients: ['lettuce', 'tomato'],
        serves: 1,
        time: [10, 15],
        CategoryId: lunch.getDataValue('id'),
        id: uuidv4(),
      },
    ]);
  },
  down: (queryInterface) => queryInterface.bulkDelete('FoodItemInMenu', null, {}),
};

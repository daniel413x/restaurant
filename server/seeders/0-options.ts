import { v4 as uuidv4 } from 'uuid';

export default {
  up: (queryInterface) => queryInterface.bulkInsert('Options', [{
    name: 'categoriesSorting',
    array: ['Appetizers', 'Breakfast', 'Lunch', 'Dessert'],
    id: uuidv4(),
  }]),
  down: (queryInterface) => queryInterface.bulkDelete('Options', null, {}),
};

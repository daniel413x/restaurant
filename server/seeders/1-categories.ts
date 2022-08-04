import { v4 as uuidv4 } from 'uuid';

export default {
  up: (queryInterface) => queryInterface.bulkInsert('Category', [
    {
      name: 'Uncategorized',
      id: uuidv4(),
      public: false,
    },
    {
      name: 'Appetizers',
      id: uuidv4(),
      public: true,
    },
    {
      name: 'Breakfast',
      id: uuidv4(),
      public: true,
    },
    {
      name: 'Lunch',
      id: uuidv4(),
      public: true,
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Category', null, {}),
};

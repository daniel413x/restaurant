import { v4 as uuidv4 } from 'uuid';
import { user } from './3-users';

export const cart = uuidv4();

export default {
  up: (queryInterface) => queryInterface.bulkInsert('Cart', [
    {
      id: uuidv4(),
      UserId: user,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Cart', null, {}),
};

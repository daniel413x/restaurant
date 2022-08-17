import { v4 as uuidv4 } from 'uuid';
import { user } from './3-users';

export const cart = '22d44aa7-5e14-4d6c-877e-f249944b4050';

export default {
  up: (queryInterface) => queryInterface.bulkInsert('Cart', [
    {
      id: cart,
      UserId: user,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Cart', null, {}),
};

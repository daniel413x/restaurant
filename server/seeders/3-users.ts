import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { ADMIN, REGISTERED } from '../utils/consts';

const hashPassword = async () => {
  const returned = await bcrypt.hash(process.env.ADMIN_PASSWORD, 5);
  return returned;
};

export const user = uuidv4();

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('User', [
    {
      email: 'admin@restaurant.com',
      password: await hashPassword(),
      id: user,
      roles: [REGISTERED, ADMIN],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('User', null, {}),
};

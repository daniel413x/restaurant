import bcrypt from 'bcrypt';
import {
  ADMIN,
  REGISTERED,
  userWithAdmin,
  userWithCartItems,
  userWithCartItemsAndOrder,
  userWithOrder,
  userWithSavedAddresses,
} from '../utils/consts';

const hashPassword = async () => {
  const returned = await bcrypt.hash('userpassword', 5);
  return returned;
};

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('User', [
    {
      email: 'userwithadmin@restaurant.com',
      password: await hashPassword(),
      id: userWithAdmin,
      roles: [REGISTERED, ADMIN],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'userwithcartitems@restaurant.com',
      password: await hashPassword(),
      id: userWithCartItems,
      roles: [REGISTERED],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'userwithorder@restaurant.com',
      password: await hashPassword(),
      id: userWithOrder,
      roles: [REGISTERED],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'userwithcartitemsandorder@restaurant.com',
      password: await hashPassword(),
      id: userWithCartItemsAndOrder,
      roles: [REGISTERED],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'userwithsavedaddresses@restaurant.com',
      password: await hashPassword(),
      id: userWithSavedAddresses,
      roles: [REGISTERED],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('User', null, {}),
};

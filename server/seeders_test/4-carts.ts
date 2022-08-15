import {
  userWithAdmin,
  userWithOrder,
  userWithCartItems,
  userWithCartItemsAndOrder,
  userWithSavedAddresses,
  cartForUserWithAdmin,
  cartForUserWithOrder,
  cartForUserWithCartItems,
  cartForUserWithCartItemsAndOrder,
  cartForUserWithSavedAddresses,
} from '../utils/consts';

export default {
  up: (queryInterface) => queryInterface.bulkInsert('Cart', [
    {
      id: cartForUserWithAdmin,
      UserId: userWithAdmin,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cartForUserWithOrder,
      UserId: userWithOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cartForUserWithCartItems,
      UserId: userWithCartItems,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cartForUserWithCartItemsAndOrder,
      UserId: userWithCartItemsAndOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cartForUserWithSavedAddresses,
      UserId: userWithSavedAddresses,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Cart', null, {}),
};

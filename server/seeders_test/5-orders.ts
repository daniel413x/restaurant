import {
  userWithOrder,
  userWithCartItemsAndOrder,
  orderForUserWithOrder,
  orderForUserWithCartItemsAndOrder,
} from '../utils/consts';

export default {
  up: (queryInterface) => queryInterface.bulkInsert('Order', [
    {
      id: orderForUserWithOrder,
      UserId: userWithOrder,
      time: [15, 20],
      status: 0,
      total: 20.19,
      actionLog: [[new Date().toString(), 'Order received']],
      activeOrder: true,
      date: new Date().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: orderForUserWithCartItemsAndOrder,
      UserId: userWithCartItemsAndOrder,
      time: [15, 20],
      status: 0,
      total: 20.19,
      actionLog: [[new Date().toString(), 'Order received']],
      activeOrder: true,
      date: new Date().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Order', null, {}),
};

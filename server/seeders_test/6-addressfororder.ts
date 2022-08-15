import {
  addressForOrderForUserWithCartItemsAndOrder,
  addressForOrderForUserWithOrder,
  orderForUserWithOrder,
  orderForUserWithCartItemsAndOrder,
} from '../utils/consts';

export default {
  up: (queryInterface) => queryInterface.bulkInsert('AddressForOrder', [
    {
      id: addressForOrderForUserWithOrder,
      OrderId: orderForUserWithOrder,
      firstName: 'Daniel',
      lastName: 'McDaniel',
      addressLineOne: '8585 Wisconsin Avenue NW',
      addressLineTwo: '#205',
      city: 'Washington',
      state: 'DC',
      zip: '20008',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: addressForOrderForUserWithCartItemsAndOrder,
      OrderId: orderForUserWithCartItemsAndOrder,
      firstName: 'Daniel',
      lastName: 'McDaniel',
      addressLineOne: '8585 Wisconsin Avenue NW',
      addressLineTwo: '#205',
      city: 'Washington',
      state: 'DC',
      zip: '20008',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('AddressForOrder', null, {}),
};

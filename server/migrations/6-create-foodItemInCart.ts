import { UUIDV4 } from 'sequelize';

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('FoodItemInCart', {
    id: {
      type: Sequelize.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    discount: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    ingredients: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    time: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    instructions: {
      type: Sequelize.STRING,
    },
    CartId: {
      type: Sequelize.UUID,
      references: {
        model: 'Cart',
        key: 'id',
      },
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('FoodItemInCart'),
};

import { UUIDV4 } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FoodItemInCart', {
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('FoodItemInCart');
  },
};

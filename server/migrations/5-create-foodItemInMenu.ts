import { UUIDV4 } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FoodItemInMenu', {
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
      },
      ingredients: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      serves: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      time: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
      },
      CategoryId: {
        type: Sequelize.UUID,
        references: {
          model: 'Category',
          key: 'id',
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('FoodItemInMenu');
  },
};

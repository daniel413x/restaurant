import { UUIDV4 } from 'sequelize';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Options', {
      id: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      array: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      string: {
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.DECIMAL,
      },
      boolean: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Options');
  },
};

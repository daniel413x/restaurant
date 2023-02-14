import { UUIDV4 } from 'sequelize';

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Order', {
    id: {
      type: Sequelize.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    UserId: {
      type: Sequelize.UUID,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    activeOrder: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    total: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actionLog: {
      type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING)),
      allowNull: false,
    },
    time: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
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
  down: (queryInterface) => queryInterface.dropTable('Order'),
};

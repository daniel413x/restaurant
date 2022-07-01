import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  UUIDV4,
  Model,
  CreationOptional,
} from 'sequelize';
import { IAddress, IFoodItem } from '../../types/types';
import sequelize from '../connection';

// eslint-disable-next-line no-use-before-define
class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  id!: string;

  UserId!: string;

  AddressId!: string;

  address?: IAddress;

  time!: [number, number];

  foodItems?: IFoodItem[];

  status!: number;

  actionLog!: string[];

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    Order.belongsTo(models.User, { targetKey: 'id' });
    Order.hasMany(models.FoodItemInOrder, {
      sourceKey: 'id',
      foreignKey: 'OrderId',
      as: 'foodItems',
    });
  }
}

Order.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  UserId: {
    type: DataTypes.UUID,
    references: {
      model: 'User',
      key: 'id',
    },
    allowNull: false,
  },
  AddressId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  actionLog: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Order',
  freezeTableName: true,
});

export default Order;

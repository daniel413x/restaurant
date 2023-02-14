import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  UUIDV4,
  Model,
  CreationOptional,
} from 'sequelize';
import { IAddressForOrder, IOrder } from '../../types/types';
import sequelize from '../connection';
import FoodItemInOrder from './FoodItemInOrder';

// eslint-disable-next-line no-use-before-define
class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> implements IOrder {
  id!: string;

  UserId?: CreationOptional<string>;

  address?: IAddressForOrder;

  time!: [number, number];

  foodItems?: FoodItemInOrder[];

  status!: number;

  activeOrder!: boolean;

  date!: string;

  total!: number;

  actionLog!: [string, string][];

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    Order.belongsTo(models.User, { targetKey: 'id' });
    Order.hasMany(models.FoodItemInOrder, {
      sourceKey: 'id',
      foreignKey: 'OrderId',
      as: 'foodItems',
    });
    Order.hasOne(models.AddressForOrder, {
      sourceKey: 'id',
      foreignKey: 'OrderId',
      as: 'address',
    });
  }
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.UUID,
    },
    time: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activeOrder: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    actionLog: {
      type: DataTypes.ARRAY(DataTypes.ARRAY),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  {
    sequelize,
    modelName: 'Order',
    freezeTableName: true,
  },
);

export default Order;

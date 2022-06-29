import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from 'sequelize';
import { orderAttributes } from '../../utils/modelAttributes';
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

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    Order.belongsTo(models.User, { targetKey: 'id' });
    Order.hasMany(models.FoodItemInOrder, {
      sourceKey: 'id',
      foreignKey: 'CartId',
      as: 'foodItems',
    });
  }
}

Order.init({
  ...orderAttributes,
}, {
  sequelize,
  modelName: 'Order',
  freezeTableName: true,
});

export default Order;

import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Model, UUIDV4,
  DataTypes,
} from 'sequelize';
import sequelize from '../db';
import { IAddress, IFoodItem } from '../types/types';

// eslint-disable-next-line no-use-before-define
class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  id!: string;

  userId!: string;

  addressId!: string;

  address!: CreationOptional<IAddress>;

  time!: [number, number];

  foodItems!: IFoodItem[];

  static associate(models: any) {
    Order.belongsTo(models.User, { targetKey: 'id' });
    Order.hasMany(models.FoodItemOrder, {
      sourceKey: 'id',
      foreignKey: 'cartId',
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
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.ABSTRACT,
    allowNull: false,
  },
  foodItems: {
    type: DataTypes.ARRAY(DataTypes.ABSTRACT),
    allowNull: false,
  },
  time: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Order',
});

export default Order;

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  UUIDV4,
} from 'sequelize';
import sequelize from '../db';
import { IFoodItem } from '../types/types';

// eslint-disable-next-line no-use-before-define
class FoodItemOrder extends Model<InferAttributes<FoodItemOrder>, InferCreationAttributes<FoodItemOrder>> implements IFoodItem {
  id!: CreationOptional<string>;

  name!: string;

  price!: number;

  orderId!: string;

  ingredients!: string[];

  instructions?: string;

  static associate(models: any) {
    FoodItemOrder.belongsTo(models.Order, { targetKey: 'id' });
  }
}
FoodItemOrder.init({
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  instructions: {
    type: DataTypes.STRING,
  },
  orderId: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'FoodItemOrder',
});

export default FoodItemOrder;

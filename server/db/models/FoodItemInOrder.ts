import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { IFoodItem } from '../../types/types';
import { foodItemOrderedAttributes } from '../../utils/modelAttributes';
import sequelize from '../connection';

// eslint-disable-next-line no-use-before-define
class FoodItemInOrder extends Model<InferAttributes<FoodItemInOrder>, InferCreationAttributes<FoodItemInOrder>> implements IFoodItem {
  id!: CreationOptional<string>;

  name!: string;

  price!: number;

  orderId!: string;

  ingredients!: string[];

  instructions?: string;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    FoodItemInOrder.belongsTo(models.Order, { targetKey: 'id' });
  }
}

FoodItemInOrder.init({
  ...foodItemOrderedAttributes,
}, {
  sequelize,
  modelName: 'FoodItemInOrder',
  freezeTableName: true,
});

export default FoodItemInOrder;

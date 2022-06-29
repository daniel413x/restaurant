import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { IFoodItem } from '../../types/types';
import { foodItemInCartAttributes } from '../../utils/modelAttributes';
import sequelize from '../connection';

// eslint-disable-next-line no-use-before-define
class FoodItemInCart extends Model<InferAttributes<FoodItemInCart>, InferCreationAttributes<FoodItemInCart>> implements IFoodItem {
  id!: CreationOptional<string>;

  name!: string;

  price!: number;

  time!: [number, number];

  CartId!: string;

  ingredients!: string[];

  instructions?: string;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    FoodItemInCart.belongsTo(models.Cart, { targetKey: 'id' });
  }
}

FoodItemInCart.init({
  ...foodItemInCartAttributes,
}, {
  sequelize,
  modelName: 'FoodItemInCart',
  freezeTableName: true,
});

export default FoodItemInCart;

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
class FoodItemCart extends Model<InferAttributes<FoodItemCart>, InferCreationAttributes<FoodItemCart>> implements IFoodItem {
  id!: CreationOptional<string>;

  name!: string;

  price!: number;

  time!: [number, number];

  cartId!: string;

  ingredients!: string[];

  instructions?: string;

  static associate(models: any) {
    FoodItemCart.belongsTo(models.Cart, { targetKey: 'id' });
  }
}
FoodItemCart.init({
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
  time: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  instructions: {
    type: DataTypes.STRING,
  },
  cartId: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'FoodItemCart',
});

export default FoodItemCart;

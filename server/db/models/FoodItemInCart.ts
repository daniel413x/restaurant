import {
  CreationOptional,
  InferAttributes,
  DataTypes,
  UUIDV4,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { IFoodItem } from '../../types/types';
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

  quantity?: number;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    FoodItemInCart.belongsTo(models.Cart, { targetKey: 'id' });
  }
}

FoodItemInCart.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
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
  quantity: {
    type: DataTypes.INTEGER,
  },
  instructions: {
    type: DataTypes.STRING,
  },
  CartId: {
    type: DataTypes.UUID,
    references: {
      model: 'Cart',
      key: 'id',
    },
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'FoodItemInCart',
  freezeTableName: true,
});

export default FoodItemInCart;

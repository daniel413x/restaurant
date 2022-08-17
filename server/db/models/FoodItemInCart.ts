import {
  DataTypes,
  UUIDV4,
} from 'sequelize';
import { IFoodItem } from '../../types/types';
import sequelize from '../connection';
import BaseFoodItem from './BaseFoodItem';

// eslint-disable-next-line no-use-before-define
class FoodItemInCart extends BaseFoodItem<FoodItemInCart> implements IFoodItem {
  discount!: string;

  time!: [number, number];

  CartId!: string;

  ingredients!: string[];

  instructions?: string;

  quantity!: number;

  static associate(models: any) {
    FoodItemInCart.belongsTo(models.Cart, { targetKey: 'id' });
  }
}

FoodItemInCart.init(
  {
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
      get() {
        const value = this.getDataValue('price');
        return value === null ? null : parseFloat(value);
      },
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      get() {
        const value = this.getDataValue('discount');
        return value === null ? null : parseFloat(value);
      },
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
      allowNull: false,
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
    modelName: 'FoodItemInCart',
    freezeTableName: true,
  },
);

export default FoodItemInCart;

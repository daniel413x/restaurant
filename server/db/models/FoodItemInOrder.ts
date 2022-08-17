import {
  CreationOptional,
  DataTypes,
  UUIDV4,
} from 'sequelize';
import sequelize from '../connection';
import BaseFoodItem from './BaseFoodItem';

// eslint-disable-next-line no-use-before-define
class FoodItemInOrder extends BaseFoodItem<FoodItemInOrder> {
  discount!: string;

  OrderId!: string;

  ingredients!: string[];

  instructions?: CreationOptional<string>;

  quantity!: number;
}

FoodItemInOrder.init(
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
    instructions: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    OrderId: {
      type: DataTypes.UUID,
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
    modelName: 'FoodItemInOrder',
    freezeTableName: true,
  },
);

export default FoodItemInOrder;

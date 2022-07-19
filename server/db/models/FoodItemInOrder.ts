import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  UUIDV4,
  Model,
} from 'sequelize';
import { IFoodItem } from '../../types/types';
import sequelize from '../connection';

// eslint-disable-next-line no-use-before-define
class FoodItemInOrder extends Model<InferAttributes<FoodItemInOrder>, InferCreationAttributes<FoodItemInOrder>> implements IFoodItem {
  id!: CreationOptional<string>;

  name!: string;

  price!: string;

  discount!: string;

  OrderId!: string;

  ingredients!: string[];

  instructions?: string;

  quantity!: number;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    FoodItemInOrder.belongsTo(models.Order, { targetKey: 'id' });
  }
}

FoodItemInOrder.init({
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
    references: {
      model: 'Order',
      key: 'id',
    },
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'FoodItemInOrder',
  freezeTableName: true,
});

export default FoodItemInOrder;

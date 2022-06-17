import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Model,
  UUIDV4,
  DataTypes,
} from 'sequelize';
import sequelize from '../db';
import { ICategory } from '../types/types';

// eslint-disable-next-line no-use-before-define
class FoodItem extends Model<InferAttributes<FoodItem>, InferCreationAttributes<FoodItem>> {
  id!: CreationOptional<string>;

  image?: string;

  name!: string;

  time?: number[];

  serves?: number;

  price!: number;

  discount?: number;

  ingredients?: string[];

  quantity?: number;

  instructions?: string;

  categoryId?: string;

  category?: ICategory;

  orderId?: string;

  cartId?: string;

  static associate(models: any) {
    FoodItem.belongsTo(models.Category, { targetKey: 'id' });
    FoodItem.belongsTo(models.Cart, { targetKey: 'id' });
    FoodItem.belongsTo(models.Order, { targetKey: 'id' });
  }
}
FoodItem.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  discount: {
    type: DataTypes.NUMBER,
  },
  ingredients: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  serves: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
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
  categoryId: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'FoodItem',
});

export default FoodItem;

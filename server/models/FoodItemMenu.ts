import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  UUIDV4,
} from 'sequelize';
import sequelize from '../db';
import { ICategory, IFoodItem } from '../types/types';

// eslint-disable-next-line no-use-before-define
class FoodItemMenu extends Model<InferAttributes<FoodItemMenu>, InferCreationAttributes<FoodItemMenu>> implements IFoodItem {
  id!: CreationOptional<string>;

  name!: string;

  price!: number;

  image!: string;

  time!: [number, number];

  serves!: number;

  discount?: number;

  ingredients?: string[];

  instructions?: string;

  categoryId?: string;

  category?: ICategory;

  static associate(models: any) {
    FoodItemMenu.belongsTo(models.Category, { targetKey: 'id' });
  }
}
FoodItemMenu.init({
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
  instructions: {
    type: DataTypes.STRING,
  },
  categoryId: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'FoodItemMenu',
});

export default FoodItemMenu;

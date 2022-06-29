import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { ICategory, IFoodItem } from '../../types/types';
import { foodItemOnMenuAttributes } from '../../utils/modelAttributes';
import sequelize from '../connection';

// eslint-disable-next-line no-use-before-define
class FoodItemInMenu extends Model<InferAttributes<FoodItemInMenu>, InferCreationAttributes<FoodItemInMenu>> implements IFoodItem {
  id!: CreationOptional<string>;

  name!: string;

  price!: number;

  image!: string;

  time!: [number, number];

  serves!: number;

  discount?: number;

  ingredients?: string[];

  instructions?: string;

  CategoryId!: string;

  category?: ICategory;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    FoodItemInMenu.belongsTo(models.Category, { targetKey: 'id' });
  }
}

FoodItemInMenu.init({
  ...foodItemOnMenuAttributes,
}, {
  sequelize,
  modelName: 'FoodItemInMenu',
  freezeTableName: true,
});

export default FoodItemInMenu;

import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Model,
} from 'sequelize';
import { categoryAttributes } from '../../utils/modelAttributes';
import sequelize from '../connection';

// eslint-disable-next-line no-use-before-define
export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  id!: CreationOptional<string>;

  name!: string;

  publicCategory!: CreationOptional<boolean>;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    Category.hasMany(models.FoodItemInMenu, {
      sourceKey: 'id',
      foreignKey: 'CategoryId',
      as: 'foodItems',
    });
  }
}

Category.init({
  ...categoryAttributes,
}, {
  sequelize,
  modelName: 'Category',
  freezeTableName: true,
});

export default Category;

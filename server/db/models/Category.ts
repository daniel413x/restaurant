import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  UUIDV4,
  CreationOptional,
  Model,
} from 'sequelize';
import sequelize from '../connection';
import FoodItemInMenu from './FoodItemInMenu';

// eslint-disable-next-line no-use-before-define
export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  id!: CreationOptional<string>;

  name!: string;

  publicCategory!: CreationOptional<boolean>;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  foodItems?: CreationOptional<FoodItemInMenu[]>;

  static associate(models: any) {
    Category.hasMany(models.FoodItemInMenu, {
      sourceKey: 'id',
      foreignKey: 'CategoryId',
      as: 'foodItems',
    });
  }
}

Category.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publicCategory: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Category',
  freezeTableName: true,
});

export default Category;

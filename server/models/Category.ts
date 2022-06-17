import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Model,
  UUIDV4,
  DataTypes,
} from 'sequelize';
import sequelize from '../db';

// eslint-disable-next-line no-use-before-define
class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  id!: CreationOptional<string>;

  name!: string;

  publicCategory!: boolean;

  static associate(models: any) {
    Category.hasMany(models.FoodItem, {
      sourceKey: 'id',
      foreignKey: 'categoryId',
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
}, {
  sequelize,
  modelName: 'Category',
});

export default Category;

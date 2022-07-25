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
import Options from './Options';

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

Category.init(
  {
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
  },
  {
    hooks: {
      // eslint-disable-next-line no-unused-vars
      afterCreate: async (category, options) => {
        const categoriesSorting = await Options.findOne({ where: { name: 'categoriesSorting' } });
        categoriesSorting.array = categoriesSorting.array.concat(category.name);
        await categoriesSorting.save();
      },
      // eslint-disable-next-line no-unused-vars
      afterUpdate: async (updatedCategory, options) => {
        const categoriesSorting = await Options.findOne({ where: { name: 'categoriesSorting' } });
        categoriesSorting.array = categoriesSorting.array.map((categoryName) => {
          if (categoryName === updatedCategory.name) {
            return updatedCategory.name;
          }
          return categoryName;
        });
        await categoriesSorting.save();
      },
      // eslint-disable-next-line no-unused-vars
      afterDestroy: async (deletedCategory, options) => {
        const categoriesSorting = await Options.findOne({ where: { name: 'categoriesSorting' } });
        categoriesSorting.array = categoriesSorting.array.filter((categoryName) => categoryName !== deletedCategory.name);
        await categoriesSorting.save();
      },
    },
    sequelize,
    modelName: 'Category',
    freezeTableName: true,
  },
);

export default Category;

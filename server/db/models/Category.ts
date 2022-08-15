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

  public!: CreationOptional<boolean>;

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
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    hooks: {
      // eslint-disable-next-line no-unused-vars
      afterCreate: async (category, options) => {
        if (category.name === 'Uncategorized') {
          return;
        }
        const categoriesSorting = await Options.findOne({ where: { name: 'categoriesSorting' } });
        categoriesSorting.array = categoriesSorting.array.concat(category.name);
        await categoriesSorting.save();
      },
      // eslint-disable-next-line no-unused-vars
      afterUpdate: async (updatedCategory, options) => {
        if (updatedCategory.name === 'Uncategorized') {
          return;
        }
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

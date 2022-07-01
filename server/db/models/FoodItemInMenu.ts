import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  UUIDV4,
  Model,
} from 'sequelize';
import { ICategory, IFoodItem } from '../../types/types';
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
  },
  discount: {
    type: DataTypes.DECIMAL,
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
  CategoryId: {
    type: DataTypes.UUID,
    references: {
      model: 'Category',
      key: 'id',
    },
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'FoodItemInMenu',
  freezeTableName: true,
});

export default FoodItemInMenu;

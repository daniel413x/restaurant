import {
  DataTypes,
  UUIDV4,
} from 'sequelize';
import { ICategory, IFoodItemInMenu } from '../../types/types';
import sequelize from '../connection';
import BaseFoodItem from './BaseFoodItem';

// eslint-disable-next-line no-use-before-define
class FoodItemInMenu extends BaseFoodItem<FoodItemInMenu> implements IFoodItemInMenu {
  image!: string;

  time!: [number, number];

  serves!: number;

  discount?: string;

  ingredients: string[];

  CategoryId!: string;

  category?: ICategory;

  static associate(models: any) {
    FoodItemInMenu.belongsTo(models.Category, { targetKey: 'id', foreignKey: 'CategoryId' });
  }
}

FoodItemInMenu.init(
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
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const value = this.getDataValue('price');
        return value === null ? null : parseFloat(value);
      },
    },
    discount: {
      type: DataTypes.DECIMAL,
      get() {
        const value = this.getDataValue('discount');
        return value === null ? null : parseFloat(value);
      },
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
    CategoryId: {
      type: DataTypes.UUID,
      references: {
        model: 'Category',
        key: 'id',
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'FoodItemInMenu',
    freezeTableName: true,
  },
);

export default FoodItemInMenu;

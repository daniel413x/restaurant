import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  UUIDV4,
  Model,
} from 'sequelize';
import { ICategory, IFoodItemInMenu } from '../../types/types';
import sequelize from '../connection';

// eslint-disable-next-line no-use-before-define
class FoodItemInMenu extends Model<InferAttributes<FoodItemInMenu>, InferCreationAttributes<FoodItemInMenu>> implements IFoodItemInMenu {
  id!: CreationOptional<string>;

  name!: string;

  price!: string;

  image!: string;

  time!: [number, number];

  serves!: number;

  discount?: string;

  ingredients: string[];

  CategoryId!: string;

  category?: ICategory;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    FoodItemInMenu.belongsTo(models.Category, { targetKey: 'id', foreignKey: 'CategoryId' });
  }
}

FoodItemInMenu.init(
  {
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
    sequelize,
    modelName: 'FoodItemInMenu',
    freezeTableName: true,
  },
);

export default FoodItemInMenu;

import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  UUIDV4,
  Model,
  CreationOptional,
} from 'sequelize';
import sequelize from '../connection';
import FoodItemInCart from './FoodItemInCart';

// eslint-disable-next-line no-use-before-define
class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
  id!: string;

  UserId!: string;

  foodItems?: FoodItemInCart[];

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    Cart.belongsTo(models.User, { targetKey: 'id' });
    Cart.hasMany(models.FoodItemInCart, {
      sourceKey: 'id',
      foreignKey: 'CartId',
      as: 'foodItems',
    });
  }
}

Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Cart',
    freezeTableName: true,
  },
);

export default Cart;

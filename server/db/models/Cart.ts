import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from 'sequelize';
import { cartAttributes } from '../../utils/modelAttributes';
import sequelize from '../connection';

// eslint-disable-next-line no-use-before-define
class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
  id!: string;

  UserId!: string;

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

Cart.init({
  ...cartAttributes,
}, {
  sequelize,
  modelName: 'Cart',
  freezeTableName: true,
});

export default Cart;

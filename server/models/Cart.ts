import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  UUIDV4,
  DataTypes,
} from 'sequelize';
import sequelize from '../db';

// eslint-disable-next-line no-use-before-define
class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
  id!: string;

  static associate(models: any) {
    Cart.belongsTo(models.User, { targetKey: 'id' });
    Cart.hasMany(models.FoodItem, {
      sourceKey: 'id',
      foreignKey: 'cartId',
      as: 'foodItems',
    });
  }
}
Cart.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'Cart',
});

export default Cart;

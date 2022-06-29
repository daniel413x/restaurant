import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Model,
} from 'sequelize';
import { userAttributes } from '../../utils/modelAttributes';
import sequelize from '../connection';

// eslint-disable-next-line no-use-before-define
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id!: CreationOptional<string>;

  role!: CreationOptional<string>;

  name?: CreationOptional<string>;

  email!: string;

  password!: string;

  avatar?: CreationOptional<string>;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    User.hasMany(models.Address, {
      sourceKey: 'id',
      foreignKey: 'UserId',
      as: 'addresses',
    });
    User.hasMany(models.Order, {
      sourceKey: 'id',
      foreignKey: 'UserId',
      as: 'orders',
    });
    User.hasOne(models.Cart, {
      sourceKey: 'id',
    });
  }
}

User.init({
  ...userAttributes,
}, {
  sequelize,
  modelName: 'User',
  freezeTableName: true,
});

export default User;

import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Model, UUIDV4,
  DataTypes,
} from 'sequelize';
import sequelize from '../db';
import { USER } from '../utils/consts';

// eslint-disable-next-line no-use-before-define
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id!: CreationOptional<string>;

  role!: CreationOptional<string>;

  name?: CreationOptional<string>;

  email!: string;

  password!: string;

  avatar?: CreationOptional<string>;

  static associate(models: any) {
    User.hasMany(models.Address, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'addresses',
    });
    User.hasMany(models.Order, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'orders',
    });
    User.hasOne(models.Cart, {
      sourceKey: 'id',
    });
  }
}
User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: USER,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /(?=^\S{6,256}$)^.+$/i,
    },
  },
  avatar: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'User',
});

export default User;

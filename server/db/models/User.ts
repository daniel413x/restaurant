import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  UUIDV4,
  CreationOptional,
  Model,
} from 'sequelize';
import { USER } from '../../utils/consts';
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
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
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
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'User',
  freezeTableName: true,
});

export default User;
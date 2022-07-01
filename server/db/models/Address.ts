import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  UUIDV4,
  CreationOptional,
  Model,
} from 'sequelize';
import sequelize from '../connection';

// eslint-disable-next-line no-use-before-define
class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
  id!: string;

  firstName!: string;

  lastName!: string;

  addressLineOne!: string;

  addressLineTwo?: CreationOptional<string>;

  city!: string;

  zip!: string;

  state!: string;

  UserId!: string;

  saved?: boolean;

  isDefault?: CreationOptional<boolean>;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    Address.belongsTo(models.User, { targetKey: 'id' });
  }
}

Address.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressLineOne: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressLineTwo: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  saved: {
    type: DataTypes.BOOLEAN,
  },
  UserId: {
    type: DataTypes.UUID,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Address',
  freezeTableName: true,
});

export default Address;

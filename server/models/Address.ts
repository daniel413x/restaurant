import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Model, UUIDV4,
  DataTypes,
} from 'sequelize';
import sequelize from '../db';

// eslint-disable-next-line no-use-before-define
class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
  id!: string;

  firstName!: string;

  lastName!: string;

  addressLineOne!: string;

  addressLineTwo!: string;

  city!: string;

  zip!: string;

  state!: string;

  isDefault?: CreationOptional<boolean>;

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
    allowNull: false,
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
  isDefault: {
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize,
  modelName: 'Address',
});

export default Address;

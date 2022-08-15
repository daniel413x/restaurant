import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  UUIDV4,
  CreationOptional,
  Model,
} from 'sequelize';
import { IAddressInAddressBook } from '../../types/types';
import sequelize from '../connection';

// eslint-disable-next-line no-use-before-define
class AddressInAddressBook extends Model<InferAttributes<AddressInAddressBook>, InferCreationAttributes<AddressInAddressBook>> implements IAddressInAddressBook {
  id!: string;

  firstName!: string;

  lastName!: string;

  addressLineOne!: string;

  addressLineTwo?: CreationOptional<string>;

  city!: string;

  zip!: string;

  state!: string;

  UserId!: string;

  isDefault?: CreationOptional<boolean>;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    AddressInAddressBook.belongsTo(models.User, { targetKey: 'id' });
  }
}

AddressInAddressBook.init(
  {
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
    modelName: 'AddressInAddressBook',
    freezeTableName: true,
  },
);

export default AddressInAddressBook;

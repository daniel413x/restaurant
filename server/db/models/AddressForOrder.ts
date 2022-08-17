import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  UUIDV4,
  CreationOptional,
  Model,
} from 'sequelize';
import { IAddressForOrder } from '../../types/types';
import sequelize from '../connection';

// eslint-disable-next-line no-use-before-define
class AddressForOrder extends Model<InferAttributes<AddressForOrder>, InferCreationAttributes<AddressForOrder>> implements IAddressForOrder {
  id!: string;

  firstName!: string;

  lastName!: string;

  addressLineOne!: string;

  addressLineTwo?: CreationOptional<string>;

  city!: string;

  zip!: string;

  state!: string;

  OrderId!: CreationOptional<string>;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;
}

AddressForOrder.init(
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
    OrderId: {
      type: DataTypes.UUID,
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
    modelName: 'AddressForOrder',
    freezeTableName: true,
  },
);

export default AddressForOrder;

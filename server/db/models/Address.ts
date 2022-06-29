import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Model,
} from 'sequelize';
import { addressAttributes } from '../../utils/modelAttributes';
import sequelize from '../connection';

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

  UserId!: string;

  isDefault?: CreationOptional<boolean>;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;

  static associate(models: any) {
    Address.belongsTo(models.User, { targetKey: 'id' });
  }
}

Address.init({
  ...addressAttributes,
}, {
  sequelize,
  modelName: 'Address',
  freezeTableName: true,
});

export default Address;

import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from 'sequelize';
import { IFoodItem } from '../../types/types';

// eslint-disable-next-line no-use-before-define
class BaseFoodItem<M extends Model> extends Model<InferAttributes<M>, InferCreationAttributes<M>> implements IFoodItem {
  id!: string;

  name!: string;

  price!: string;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;
}

export default BaseFoodItem;

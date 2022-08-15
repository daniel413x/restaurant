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
export class Options extends Model<InferAttributes<Options>, InferCreationAttributes<Options>> {
  id!: CreationOptional<string>;

  name!: string;

  array!: CreationOptional<any[]>;

  number!: CreationOptional<number>;

  string!: CreationOptional<string>;

  boolean!: CreationOptional<boolean>;

  createdAt?: CreationOptional<Date>;

  updatedAt?: CreationOptional<Date>;
}

Options.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    array: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    string: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.DECIMAL,
    },
    boolean: {
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
    modelName: 'Options',
    freezeTableName: true,
  },
);

export default Options;

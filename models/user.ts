import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import * as dotenv from "dotenv";


dotenv.config();

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  age?: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public age?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sequelize = new Sequelize(process.env.DATABASE_URL || "");

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Users",
    timestamps: true,
  }
);

sequelize.sync();

export { User, sequelize };

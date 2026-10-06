import { sequelize } from "../connections.js";
import { DataTypes } from "sequelize";

export const userModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        notNull: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        checkPasswordLength(value){
            if(value.length <= 6) throw new Error("The password must be greater than 6 characters");
            
        }
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin"],
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
  },
  {

    hooks:{ beforeCreate(user) {
          if (user.name.length <= 2)
           throw new Error("name must be greater than 2 characters");
        }},
    timestamps: true,
    paranoid: true,
  },
);

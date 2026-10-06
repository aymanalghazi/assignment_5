import { sequelize } from "../connections.js";
import { DataTypes ,Model } from "sequelize";
import { userModel } from "./Users.model.js";

export class posts extends Model {}

posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "post",
  },
);

userModel.hasMany(posts, {
    onDelete : "CASCADE",
    onUpdate : "CASCADE"
})
posts.belongsTo(userModel)

import { sequelize } from "../connections.js";
import { DataTypes, Model } from "sequelize";
import { userModel } from "./Users.model.js";
import { posts } from "./posts.model.js";

 class commentsModel extends Model {}

commentsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "comment",
  },
);

userModel.hasMany(commentsModel,{
     onDelete : "CASCADE",
    onUpdate : "CASCADE",
})
commentsModel.belongsTo(userModel)

posts.hasMany(commentsModel,{
     onDelete : "CASCADE",
    onUpdate : "CASCADE"
})
commentsModel.belongsTo(posts)

export default commentsModel
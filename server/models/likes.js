"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    static associate(models) {
      Likes.belongsTo(models.Users, { foreignKey: "userId" });
      Likes.belongsTo(models.Articles, { foreignKey: "postId" });
    }
  }
  Likes.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Articles",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};

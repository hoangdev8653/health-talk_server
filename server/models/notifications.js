"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    static associate(models) {
      Notifications.belongsTo(models.Users, {
        foreignKey: "receiverId",
        as: "receiver",
      });
      Notifications.belongsTo(models.Users, {
        foreignKey: "senderId",
        as: "sender",
      });
      Notifications.belongsTo(models.Articles, {
        foreignKey: "postId",
        as: "post",
      });
    }
  }
  Notifications.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      receiverId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      senderId: {
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
      type: {
        type: DataTypes.ENUM("like", "comment", "block", "unblock"),
      },
      message: DataTypes.STRING,
      is_read: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Notifications",
    }
  );
  return Notifications;
};

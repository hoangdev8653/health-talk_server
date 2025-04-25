"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ManagerUsers extends Model {
    static associate(models) {
      ManagerUsers.belongsTo(models.Users, {
        foreignKey: "userBlockedId",
        as: "userBlocked",
      });
      ManagerUsers.belongsTo(models.Users, {
        foreignKey: "blockedById",
        as: "blockedBy",
      });
    }
  }
  ManagerUsers.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      blockedById: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      blockReason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userBlockedId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      blockedAt: DataTypes.DATE,
      unblockedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ManagerUsers",
    }
  );
  return ManagerUsers;
};

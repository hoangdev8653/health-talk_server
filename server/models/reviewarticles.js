"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ReviewArticles extends Model {
    static associate(models) {
      ReviewArticles.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      ReviewArticles.belongsTo(models.Articles, {
        foreignKey: "articleId",
        onDelete: "CASCADE",
      });
      ReviewArticles.hasMany(models.ReviewArticles, {
        foreignKey: "parentId",
        as: "replies",
        onDelete: "CASCADE",
      });
      ReviewArticles.belongsTo(models.ReviewArticles, {
        foreignKey: "parentId",
        as: "parent",
      });
    }
  }

  ReviewArticles.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      articleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Articles",
          key: "id",
        },
      },
      parentId: {
        type: DataTypes.UUID,
        defaultValue: null,
        references: {
          model: "ReviewArticles",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "ReviewArticles",
    }
  );

  return ReviewArticles;
};

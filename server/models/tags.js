"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate(models) {
      Tags.belongsToMany(models.Questions, {
        through: "QuestionTags",
        foreignKey: "tagId",
        as: "questions",
      });
    }
  }
  Tags.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      slug: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tags",
    }
  );
  return Tags;
};

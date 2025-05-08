"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    static associate(models) {
      Questions.belongsTo(models.Users, { foreignKey: "userId" });
      Questions.belongsToMany(models.Tags, {
        through: "QuestionTags",
        foreignKey: "questionId",
        as: "tags",
      });
    }
  }

  Questions.init(
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      views: {
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
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Questions",
    }
  );

  return Questions;
};

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class QuestionTags extends Model {
    static associate(models) {
      QuestionTags.belongsTo(models.Questions, {
        foreignKey: "questionId",
        as: "questions",
      });

      QuestionTags.belongsTo(models.Tags, {
        foreignKey: "tagId",
        as: "tags",
      });
    }
  }

  QuestionTags.init(
    {
      questionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Questions",
          key: "id",
        },
      },
      tagId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Tags",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "QuestionTags",
    }
  );

  return QuestionTags;
};

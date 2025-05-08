"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    static associate(models) {
      Answers.belongsTo(models.Users, { foreignKey: "userId" });
      Answers.belongsTo(models.Questions, { foreignKey: "questionId" });
    }
  }
  Answers.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      questionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Questions",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Answers",
    }
  );
  return Answers;
};

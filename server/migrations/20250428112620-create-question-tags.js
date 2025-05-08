"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("QuestionTags", {
      questionId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Questions",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      tagId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Tags",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("QuestionTags");
  },
};

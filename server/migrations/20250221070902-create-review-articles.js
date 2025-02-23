"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ReviewArticles", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      content: {
        type: Sequelize.STRING,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: null,
        references: {
          model: "Users",
          key: "id",
        },
      },
      articleId: {
        type: Sequelize.UUID,
        allowNull: null,
        references: {
          model: "Articles",
          key: "id",
        },
      },
      parentId: {
        type: Sequelize.UUID,
        references: {
          model: "ReviewArticles",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ReviewArticles");
  },
};

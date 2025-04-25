"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ManagerUsers", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      isBlocked: {
        type: Sequelize.BOOLEAN,
      },
      blockedById: {
        type: Sequelize.UUID,
        allowNull: null,
        references: {
          model: "Users",
          key: "id",
        },
      },
      blockReason: {
        type: Sequelize.TEXT,
      },
      blockedAt: {
        type: Sequelize.DATE,
      },
      unblockedAt: {
        type: Sequelize.DATE,
      },
      userBlockedId: {
        type: Sequelize.UUID,
        allowNull: null,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ManagerUsers");
  },
};

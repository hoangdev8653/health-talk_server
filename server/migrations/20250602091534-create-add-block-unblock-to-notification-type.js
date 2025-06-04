"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `ALTER TYPE "enum_Notifications_type" ADD VALUE IF NOT EXISTS 'block';`
    );
    await queryInterface.sequelize.query(
      `ALTER TYPE "enum_Notifications_type" ADD VALUE IF NOT EXISTS 'unblock';`
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Add-block-unblock-to-notification-types");
  },
};

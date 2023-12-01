"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("marquee_text", {
      no: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.STRING(1000),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("marquee_text");
  },
};

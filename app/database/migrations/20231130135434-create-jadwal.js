"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("jadwal", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING(1000),
      },
      title: {
        type: Sequelize.STRING(255),
      },
      text: {
        type: Sequelize.STRING(255),
      },
      text_its_time: {
        type: Sequelize.STRING(255),
      },
      date: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("jadwal");
  },
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('video', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      video: {
        type: Sequelize.STRING(1000)
      },
      title: {
        type: Sequelize.STRING(255)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('video');
  }
};
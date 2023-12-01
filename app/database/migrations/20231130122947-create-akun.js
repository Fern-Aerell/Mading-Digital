'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('akun', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      pass: {
        allowNull: false,
        type: Sequelize.STRING(255)
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('akun');
  }

};
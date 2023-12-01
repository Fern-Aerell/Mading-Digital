"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JadwalModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JadwalModel.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING(1000),
      },
      title: {
        type: DataTypes.STRING(255),
      },
      text: {
        type: DataTypes.STRING(255),
      },
      text_its_time: {
        type: DataTypes.STRING(255),
      },
      date: {
        type: DataTypes.DATE,
      }
    },
    {
      sequelize,
      modelName: "jadwal",
      tableName: "jadwal",
      timestamps: false
    }
  );
  return JadwalModel;
};

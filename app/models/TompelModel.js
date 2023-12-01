"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TompelModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TompelModel.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      text: {
        type: DataTypes.STRING(255),
      }
    },
    {
      sequelize,
      modelName: "tompel",
      tableName: "tompel",
      timestamps: false
    }
  );
  return TompelModel;
};

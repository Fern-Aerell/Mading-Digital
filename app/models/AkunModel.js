"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AkunModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AkunModel.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(255)
      },
      pass: {
        allowNull: false,
        type: DataTypes.STRING(255)
      }
    },
    {
      sequelize,
      modelName: "akun",
      tableName: "akun",
      timestamps: false
    }
  );
  return AkunModel;
};

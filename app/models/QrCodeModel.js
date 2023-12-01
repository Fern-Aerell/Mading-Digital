"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QrCodeModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QrCodeModel.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      image: {
        type: DataTypes.STRING(1000)
      },
      value: {
        type: DataTypes.STRING(255)
      },
      description: {
        type: DataTypes.STRING(255)
      },
      use: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      sequelize,
      modelName: "qrcode",
      tableName: "qrcode",
      timestamps: false
    }
  );
  return QrCodeModel;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MarqueeTextModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MarqueeTextModel.init(
    {
      no: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      text: {
        type: DataTypes.STRING(1000),
      }
    },
    {
      sequelize,
      modelName: "marquee_text",
      tableName: "marquee_text",
      timestamps: false
    }
  );
  return MarqueeTextModel;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VideoModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VideoModel.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      video: {
        type: DataTypes.STRING(1000)
      },
      title: {
        type: DataTypes.STRING(255)
      }
    },
    {
      sequelize,
      modelName: "video",
      tableName: "video",
      timestamps: false
    }
  );
  return VideoModel;
};

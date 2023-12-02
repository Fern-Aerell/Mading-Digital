const {Sequelize, DataTypes} = require("sequelize");
const databaseConfig = require("../config/database.js")[process.env.NODE_ENV];
const sequelize = new Sequelize(databaseConfig);

const AkunModel = require("../models/AkunModel.js")(sequelize, DataTypes);
const JadwalModel = require("../models/JadwalModel.js")(sequelize, DataTypes);
const MarqueeTextModel = require("../models/MarqueeTextModel.js")(sequelize, DataTypes);
const QrCodeModel = require("../models/QrCodeModel.js")(sequelize, DataTypes);
const TompelModel = require("../models/TompelModel.js")(sequelize, DataTypes);
const VideoModel = require("../models/VideoModel.js")(sequelize, DataTypes);

module.exports = {
    sequelize,
    AkunModel,
    JadwalModel,
    MarqueeTextModel,
    QrCodeModel,
    TompelModel,
    VideoModel
}
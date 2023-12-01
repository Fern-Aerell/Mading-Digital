const {Sequelize, DataTypes} = require("sequelize");
const databaseConfig = require("../config/database.js")[process.env.NODE_ENV];
const sequelize = new Sequelize(databaseConfig);
const JadwalModel = require("../models/JadwalModel.js")(sequelize, DataTypes);
const MarqueeTextModel = require("../models/MarqueeTextModel.js")(sequelize, DataTypes);
const QrCodeModel = require("../models/QrCodeModel.js")(sequelize, DataTypes);
const TompelModel = require("../models/TompelModel.js")(sequelize, DataTypes);
const VideoModel = require("../models/VideoModel.js")(sequelize, DataTypes);

class ApiController {

    static async get_marquee_text(req, res) {
        res.type('json');
        const data = await MarqueeTextModel.findAll();
        res.send(JSON.stringify(data));
    }

    static async get_use_qrcode(req, res) {
        res.type('json');
        const data = await QrCodeModel.findOne({where: {use: 1}});
        res.send(JSON.stringify(data));
    }

    static async get_video(req, res) {
        res.type('json');
        const data = await VideoModel.findAll();
        res.send(JSON.stringify(data));
    }

    static async get_jadwal_with_day(req, res) {
        res.type('json');
        const day = req.params.day;
        const data = await JadwalModel.findAll({where: sequelize.literal(`DAYOFWEEK(date) = ${day}`)});
        res.send(JSON.stringify(data));
    }

    static async get_tompel(req, res) {
        res.type('json');
        const data = await TompelModel.findOne();
        res.send(JSON.stringify(data));
    }

}

module.exports = ApiController;
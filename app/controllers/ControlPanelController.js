const { AkunModel, JadwalModel, MarqueeTextModel, QrCodeModel, TompelModel, VideoModel } = require("../core/database.js");
const password_utils = require("../utils/password.js");
const qrcode_utils = require("../utils/qrcode.js");
const fs = require('fs/promises');
const moment = require('moment');
const { updateMarqueeText, updateUseQrCode, updateVideo, updateJadwal, updateTompel } = require("../core/client.js");

let socketNameSpace;

async function isLogin(req) {
    const data = {
        msg: null,
        status: false
    }

    let username = null;
    let password = null;

    if(req.session.username && req.session.pass) {
        username = req.session.username;
        password = req.session.pass;
    }else{
        if(req.body.username && req.body.pass) {
            username = req.body.username;
            password = req.body.pass;
        }
    }

    if(username != null && password != null) {
        const result = await AkunModel.findOne({where: {username: username}});

        if(result != null) {
            if(await password_utils.compare(password, result.pass)) {
                req.session.username = username;
                req.session.pass = password;
                data.status = true;
            }else{
                data.msg = "Password Salah!";
            }
        }else{
            data.msg = "Username Tidak Terdaftar.";
        }
    }

    return data;
}

class ControlPanelController {

    static initializeWebSocket(ioNamespace) {
        socketNameSpace = ioNamespace;
    }

    static login(req, res) {
        res.redirect('/control_panels/qrcode');
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            } else {
                res.redirect('/control_panels/login');
            }
        });
    }

    static async jadwal(req, res) {
        const data = await isLogin(req);
        if(data.status == true) {
            data.sidebar_select = "jadwal";

            // Show & Hide Add Popup
            if(req.query.add_popup && req.query.add_popup == "true") {
                data.add_popup = true;
            }else{
                data.add_popup = false;
            }

            // Add Jadwal
            if(req.query.add_popup && req.query.add_popup == "true" && req.files && req.body.title && req.body.text && req.body.text_its_time && req.body.date) {
                data.add_popup = false;
                const file_image = req.files.image;
                const image = Date.now().toString() + " - " + file_image.name;
                const title = req.body.title;
                const text = req.body.text;
                const text_its_time = req.body.text_its_time;
                const date = req.body.date;
                file_image.mv(`public/upload/images/${image}`, (error) => {
                    if(error) console.error("Gagal mengupload file:", error);
                });
                await JadwalModel.create({image: image, title: title, text: text, text_its_time: text_its_time, date: date});
                updateJadwal(socketNameSpace);
            }

            // Show & Hide Edit Popup
            if(req.query.edit_popup && req.query.edit_popup == "true" && req.query.edit_id) {
                const jadwal_id = req.query.edit_id;
                data.edit_popup = true;
                data.edit_result = JSON.parse(JSON.stringify(await JadwalModel.findByPk(jadwal_id)));
                data.edit_result.date = moment(data.edit_result.date).format('YYYY-MM-DD HH:mm:ss');
                data.url = req.url;
                if(req.query.edit_image && req.query.edit_image == "true") {
                    data.edit_image = true;
                }else{
                    data.edit_image = false;
                }
            }else{
                data.edit_popup = false;
            }

            // Edit Jadwal
            if(req.query.edit_popup && req.query.edit_popup == "true" && req.query.edit_id && req.body.title && req.body.text && req.body.text_its_time && req.body.date) {
                data.edit_popup = false;
                const jadwal_id = req.query.edit_id;
                const title = req.body.title;
                const text = req.body.text;
                const text_its_time = req.body.text_its_time;
                const date = req.body.date;
                const result = await JadwalModel.findByPk(jadwal_id);
                if(result) {
                    if(req.files) {
                        const file_image = req.files.image;
                        const image = Date.now().toString() + " - " + file_image.name;
                        file_image.mv(`public/upload/images/${image}`, (error) => {
                            if(error) console.error("Gagal mengupload file:", error);
                        });
                        await JadwalModel.update({image: image, title: title, text: text, text_its_time: text_its_time, date: date}, {where: {id: jadwal_id}});
                    }else{
                        await JadwalModel.update({title: title, text: text, text_its_time: text_its_time, date: date}, {where: {id: jadwal_id}});
                    }
                    updateJadwal(socketNameSpace);
                }
            }

            // Delete Jadwal
            if(req.query.delete) {
                const jadwal_id = req.query.delete;
                const result = await JadwalModel.findByPk(jadwal_id);
                if(result) {
                    const jadwal_image_path = `public/upload/images/${result.image}`;
                    await fs.access(jadwal_image_path);
                    await fs.unlink(jadwal_image_path);
                    await JadwalModel.destroy({where: {id: jadwal_id}});
                    updateJadwal(socketNameSpace);
                }
            }

            data.jadwal_list = JSON.parse(JSON.stringify(await JadwalModel.findAll()));

            res.render("control_panels/jadwal", data);
        }else{
            res.render("control_panels/login", data);
        }
    }

    static async marquee_text(req, res) {
        const data = await isLogin(req);
        if(data.status == true) {
            data.sidebar_select = "marquee_text";

            // Add Marquee Text
            if(req.body.text && req.body.text.length > 0) {
                const text = req.body.text;
                await MarqueeTextModel.create({text: text});
                updateMarqueeText(socketNameSpace);
            }

            // Delete Marquee Text
            if(req.query.delete) {
                const marquee_text_no = req.query.delete;
                const result = await MarqueeTextModel.findByPk(marquee_text_no);
                if(result) {
                    await MarqueeTextModel.destroy({where: {no: marquee_text_no}});
                    updateMarqueeText(socketNameSpace);
                }
            }

            data.marquee_text_list = JSON.parse(JSON.stringify(await MarqueeTextModel.findAll()));

            res.render("control_panels/marquee_text", data);
        }else{
            res.render("control_panels/login", data);
        }
    }

    static async qrcode(req, res) {
        const data = await isLogin(req);
        if(data.status == true) {

            data.sidebar_select = "qrcode";
            
            // Add Qrcode
            if(req.body.link && req.body.description && req.body.link.length > 0 && req.body.description.length > 0) {
                const link = req.body.link; 
                const description = req.body.description; 
                const qrcode_image_filename = `${description}.png`;
                req.query.add_popup = false;
                if(await qrcode_utils.generate(link, `public/upload/qrcodes/${qrcode_image_filename}`)) {
                    await QrCodeModel.create({image: qrcode_image_filename, value: link, description: description, use: 0});
                }
            }

            // Use Qrcode
            if(req.query.use) {
                const qrcode_id = req.query.use;
                const result = await QrCodeModel.findByPk(qrcode_id);
                if(result) {
                    await QrCodeModel.update({use: 0}, {where: {use:1}});
                    await QrCodeModel.update({use: 1}, {where: {id: qrcode_id}});
                    updateUseQrCode(socketNameSpace);
                }
            }

            // Delete Qrcode
            if(req.query.delete) {
                const qrcode_id = req.query.delete;
                const result = await QrCodeModel.findByPk(qrcode_id);
                if(result) {
                    const qrcode_image_path = `public/upload/qrcodes/${result.image}`;
                    await fs.access(qrcode_image_path);
                    await fs.unlink(qrcode_image_path);
                    await QrCodeModel.destroy({where: {id: qrcode_id}});
                    updateUseQrCode(socketNameSpace);
                }
            }

            // Show & Hide Add Popup
            if(req.query.add_popup && req.query.add_popup == "true") {
                data.add_popup = true;
            }else{
                data.add_popup = false;
            }

            data.qrcode_list = JSON.parse(JSON.stringify(await QrCodeModel.findAll()));

            res.render("control_panels/qrcode", data);
        }else{
            res.render("control_panels/login", data);
        }
    }

    static async tompel(req, res) {
        const data = await isLogin(req);
        if(data.status == true) {

            data.sidebar_select = "tompel";

            // Reset Tompel
            if(req.query.reset) {
                const tompel_id = req.query.reset;
                const result = await TompelModel.findByPk(tompel_id);
                if(result) {
                    await TompelModel.update({text: "DDS"}, {where: {id: tompel_id}});
                    updateTompel(socketNameSpace);
                }
            }

            // Edit Tompel
            if(req.body.id && req.body.text) {
                const tompel_id = req.body.id;
                const text = req.body.text;
                const result = await TompelModel.findByPk(tompel_id);
                if(result) {
                    await TompelModel.update({text: text}, {where: {id: tompel_id}});
                    updateTompel(socketNameSpace);
                }
            }

            data.tompel_data = JSON.parse(JSON.stringify(await TompelModel.findOne()));

            res.render("control_panels/tompel", data);
        }else{
            res.render("control_panels/login", data);
        }
    }

    static async video(req, res) {
        const data = await isLogin(req);
        if(data.status == true) {
            data.sidebar_select = "video";

            // Show & Hide Add Popup
            if(req.query.add_popup && req.query.add_popup == "true") {
                data.add_popup = true;
            }else{
                data.add_popup = false;
            }

            // Add Video
            if(req.files && req.body.title) {
                data.add_popup = false;
                const file_video = req.files.video;
                const video = Date.now().toString() + " - " + file_video.name;
                const title = req.body.title;
                file_video.mv(`public/upload/videos/${video}`, (error) => {
                    if(error) console.error("Gagal mengupload file:", error);
                });
                await VideoModel.create({video: video, title: title});
                updateVideo(socketNameSpace);
            }

            // Delete Video
            if(req.query.delete) {
                const video_id = req.query.delete;
                const result = await VideoModel.findByPk(video_id);
                if(result) {
                    const file_video_path = `public/upload/videos/${result.video}`;
                    await fs.access(file_video_path);
                    await fs.unlink(file_video_path);
                    await VideoModel.destroy({where: {id: video_id}});
                    updateVideo(socketNameSpace);
                }
            }

            data.video_list = JSON.parse(JSON.stringify(await VideoModel.findAll()));

            res.render("control_panels/video", data);
        }else{
            res.render("control_panels/login", data);
        }
    }
}

module.exports = ControlPanelController;
const express = require('express');
const router = express.Router();

const ClientController = require("../controllers/ClientController.js");
const ControlPanelController = require("../controllers/ControlPanelController.js");
const ApiController = require("../controllers/ApiController.js");

function setupRouter(ioNamespace) {

    ControlPanelController.initializeWebSocket(ioNamespace);

    router.get(["/", "/client"], ClientController.index);

    router.get(["/control_panels", "/control_panels/login"], ControlPanelController.login);
    router.get("/control_panels/logout", ControlPanelController.logout);
    router.get("/control_panels/jadwal", ControlPanelController.jadwal);
    router.get("/control_panels/marquee_text", ControlPanelController.marquee_text);
    router.get("/control_panels/qrcode", ControlPanelController.qrcode);
    router.get("/control_panels/tompel", ControlPanelController.tompel);
    router.get("/control_panels/video", ControlPanelController.video);

    router.post("/control_panels/qrcode", ControlPanelController.qrcode);
    router.post("/control_panels/marquee_text", ControlPanelController.marquee_text);
    router.post("/control_panels/tompel", ControlPanelController.tompel);
    router.post("/control_panels/jadwal", ControlPanelController.jadwal);
    router.post("/control_panels/video", ControlPanelController.video);

    router.get("/api/get_marquee_text", ApiController.get_marquee_text);
    router.get("/api/get_use_qrcode", ApiController.get_use_qrcode);
    router.get("/api/get_video", ApiController.get_video);
    router.get("/api/get_jadwal_with_day/:day", ApiController.get_jadwal_with_day);
    router.get("/api/get_tompel", ApiController.get_tompel);
}

module.exports = {setupRouter, router};
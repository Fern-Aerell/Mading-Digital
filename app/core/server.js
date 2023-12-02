require("dotenv").config();

const express = require("express");
const session = require("express-session");
const fileUpload = require('express-fileupload');
const {router, setupRouter} = require("../config/routes.js");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/../views");
app.use(express.static("public"));
app.use(
  session({
    secret: "mading_digital_dds_project_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
const httpServer = createServer(app);
const io = new Server(httpServer, {});
const socketNameSpace = io.of("/websocket");

const baseUrl = process.env.BASE_URL;
const port = process.env.PORT;
const client_connection = [];

setupRouter(socketNameSpace);

module.exports = {
    socketNameSpace,
    httpServer,
    port,
    baseUrl,
    client_connection
};
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const fileUpload = require('express-fileupload');
const routes = require("./config/routes.js");

const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
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
app.use("/", routes);

const baseUrl = process.env.BASE_URL;
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Mading Digital berjalan pada ${baseUrl}:${port}`);
});

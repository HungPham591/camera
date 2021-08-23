var express = require("express");//la framework cua nodejs
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const route = require("./routes");
const db = require("./config/db");
const fileUpload = require("express-fileupload");

db.connect();

var app = express();

app.use(bodyParser.json());//nhan data tu stream khoi tao req.body
app.use(logger("dev"));//log ra request
app.use(express.json());//nhan data tu stream khoi tao req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());//xu ly cookie gui tu client
app.use(express.static(path.join(__dirname, "public")));//
app.use(fileUpload());


let listCamera = require("./Run");
listCamera.start();
route(app, listCamera);

// process.env.controlCamera = db;

// const workerFarm = require('worker-farm')
// const service = workerFarm(require.resolve(__dirname + '\\test.js'))
// service(null, function (err, output) {
// })


module.exports = app;

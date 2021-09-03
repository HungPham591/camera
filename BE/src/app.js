const express = require("express");//la framework cua nodejs
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const route = require("./routes");
const db = require("./config/db");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const listCamera = require("./modules/run");

require('dotenv').config();

db.connect();

const app = express();

app.use(bodyParser.json());//nhan data tu stream khoi tao req.body
app.use(logger("dev"));//log ra request
app.use(express.json());//nhan data tu stream khoi tao req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());//xu ly cookie gui tu client
app.use(express.static(path.join(__dirname, "public")));//
app.use(fileUpload());
app.use(cors());// enable cors

listCamera.start();
route(app);


// const workerFarm = require('worker-farm')
// const service = workerFarm(require.resolve(__dirname + '\\modules\\test.js'))
// service(null, function (err, output) {
// })


module.exports = app;

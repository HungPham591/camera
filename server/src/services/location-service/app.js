const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");
const route = require("../../routes/location.routes");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
app.use(express.static(path.join(__dirname, '..', '..', "public")));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));// enable cors
app.use(fileUpload());
app.use(cookieParser());
app.use(route);

module.exports = app;
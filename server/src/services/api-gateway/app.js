const express = require('express');
// const logger = require('morgan')
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const Authentication = require('../../middleware/authentication.middleware');

// app.use(logger("dev"));//log ra request
app.use(express.json());//nhan data tu stream khoi tao req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());//xu ly cookie gui tu client

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));// enable cors
app.use('/graphql', Authentication)

module.exports = app;
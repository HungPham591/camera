const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");
const route = require("./routes");

app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));// enable cors

app.use(route);

module.exports = app;
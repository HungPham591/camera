const express = require("express");
const router = express.Router();
const { getReport } = require('../controllers/report')

router.get("/", getReport);

module.exports = router;

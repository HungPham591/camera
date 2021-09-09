const express = require("express");
const router = express.Router();
const { getReport } = require('../controllers/report')

router.post("/", getReport);

module.exports = router;

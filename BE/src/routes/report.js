const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const { getReport, getReportByVideo } = require('../controllers/report')

router.post("/", auth, getReport);
router.post('/getByVideo', auth, getReportByVideo)

module.exports = router;

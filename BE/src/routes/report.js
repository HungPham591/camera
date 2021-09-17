const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const { getReport, getReportByVideo, getAll } = require('../controllers/report')

router.post("/", auth, getReport);
router.get('/getAll', getAll);
router.post('/getByVideo', auth, getReportByVideo)


module.exports = router;

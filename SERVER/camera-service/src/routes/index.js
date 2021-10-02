const express = require("express");
const router = express.Router();
const { uploadImg, streamVideo } = require('../controllers/file.controller')

router.get("/video/:id", streamVideo);
router.post('/uploadImg', uploadImg);

module.exports = router;

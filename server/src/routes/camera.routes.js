const express = require("express");
const router = express.Router();
const { uploadImg, streamVideo } = require('../controllers/file.controller');
const authentication = require('../middleware/authentication.middleware');

router.get("/video/:camera_id/:video_time", streamVideo);
router.post('/uploadImg', authentication, uploadImg);

module.exports = router;

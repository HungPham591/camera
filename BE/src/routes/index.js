const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth.middleware')
const { uploadImg, streamVideo } = require('../controllers/file.controller')

router.get("/video/:id", streamVideo);
router.post('/uploadImg', auth, uploadImg);

module.exports = router;

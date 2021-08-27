const express = require("express");
const router = express.Router();
const VideoModel = require("../models/VideoModel");
const fs = require("fs");
const { getVideo, playVideo } = require('../controllers/video')

router.get("/", getVideo);
router.get("/playVideo/:id", playVideo);

module.exports = router;

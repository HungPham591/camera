const express = require("express");
const router = express.Router();
const VideoModel = require("../models/VideoModel");
const fs = require("fs");
const { getVideo, playVideo, getAll } = require('../controllers/video')

router.post("/", getVideo);
router.get('/getAll', getAll)
router.get("/playVideo/:id", playVideo);

module.exports = router;

const express = require("express");
const router = express.Router();
const fs = require("fs");
const workerFarm = require('worker-farm')
const { faceInVideo } = require('../controller/search');

router.post('/faceInVideo', faceInVideo)
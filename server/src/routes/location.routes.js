const express = require("express");
const router = express.Router();
const { uploadMap } = require('../controllers/file.controller');
const authentication = require('../middleware/authentication.middleware');


router.post('/uploadImg', authentication, uploadMap);

module.exports = router;

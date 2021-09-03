const express = require("express");
const router = express.Router();
const { getCamera, createCamera, updateCamera, deleteCamera, createFace } = require('../controllers/camera')

router.get("/", getCamera);
router.post("/", createCamera);
router.put("/", updateCamera);
router.delete("/", deleteCamera);
router.post("/img", createFace);

module.exports = router;

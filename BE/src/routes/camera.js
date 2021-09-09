const express = require("express");
const router = express.Router();
const { getCamera, getByUser, getByName, createCamera, updateCamera, deleteCamera, createFace } = require('../controllers/camera')
const auth = require('../middleware/auth')

router.post("/", getCamera);
router.post('/getByName', getByName)
router.post('/getByUser', auth, getByUser)
router.post("/createCamera", auth, createCamera);
router.put("/", auth, updateCamera);
router.delete("/", auth, deleteCamera);
router.post("/img", auth, createFace);

module.exports = router;

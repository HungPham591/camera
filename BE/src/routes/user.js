const express = require("express");
const router = express.Router();
const { logOut, signUp, signIn, getInfo, getAll } = require('../controllers/user')
const auth = require('../middleware/auth')

router.get('/getAll', getAll)
router.get('/getInfo', auth, getInfo)
router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/logOut", logOut);

module.exports = router;

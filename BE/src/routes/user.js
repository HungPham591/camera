const express = require("express");
const router = express.Router();
const { logOut, signUp, signIn } = require('../controllers/user')

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/logOut", logOut);

module.exports = router;

const express = require("express");
const router = express.Router();
const { login, logout, getUser, createUser } = require('../controllers/user')

router.post("/login", login);
router.post("/logout", logout);
router.post("/getById", getUser);
router.post("/insert", createUser);

module.exports = router;

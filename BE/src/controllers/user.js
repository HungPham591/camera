const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

// require("dotenv").config();

exports.login = async (req, res) => {
    let user = await UserModel.findById(req.body);
    if (!user) return res.sendStatus(401);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
}
exports.logout = async (req, res) => {

}
exports.getUser = async (req, res) => {
    let user = await UserModel.findById(req.body);
    res.send(user);
}
exports.createUser = async (req, res) => {
    let user = await UserModel.findOne({ google_id: req.body.google_id });
    if (user) {
        res.send(user);
    } else {
        let newUser = await new UserModel(req.body).save();
        res.send(newUser);
    }
}
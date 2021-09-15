const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.getInfo = async (req, res) => {
    let id = req.body.user;
    let user = await UserModel.findById(id);
    res.send(user);
}
exports.signIn = async (req, res) => {
    let user = await UserModel.findOne(req.body);
    if (!user) return res.status(401).json({ success: false });
    const payload = {
        _id: user._id
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.cookie('access_token', accessToken, {
        maxAge: 365 * 24 * 60 * 60 * 100,
        httpOnly: true,
        //secure: true;
    })
    res.status(200).json({ success: true, data: user })
}
exports.signUp = async (req, res) => {
    let user = await UserModel.findOne(req.body);
    if (!user) {
        user = await new UserModel(req.body).save();
    }
    const payload = {
        _id: newUser._id
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.cookie('access_token', accessToken, {
        maxAge: 365 * 24 * 60 * 60 * 100,
        httpOnly: true,
        //secure: true;
    })
    res.status(200).json({ success: true })
}
exports.logOut = async (req, res) => {

}
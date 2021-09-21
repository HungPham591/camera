const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.getUser = async (args, req, res) => {
    if (!req.user) return null;
    return await UserModel.findById(req.user);
}
exports.getUsers = async (args, req, res) => {
    return await UserModel.find(args);
}
exports.signIn = async (args, req, res) => {
    let user = await UserModel.findOne(args);
    if (!user) return null;
    const payload = { _id: user._id }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.cookie('access_token', accessToken, {
        maxAge: 365 * 24 * 60 * 60 * 100,
        httpOnly: true,
        //secure: true;
    })
    return user;
}
exports.signUp = async (args, req, res) => {
    let user = await UserModel.findOne(args);
    if (!user) user = await new UserModel(args).save();
    const payload = { _id: newUser._id }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.cookie('access_token', accessToken, {
        maxAge: 365 * 24 * 60 * 60 * 100,
        httpOnly: true,
        //secure: true;
    })
    return user;
}
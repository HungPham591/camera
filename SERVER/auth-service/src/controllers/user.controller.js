const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.getUser = async (args) => {
    if (!args.user) return null;
    return await UserModel.findById(args.user);
}
exports.getUsers = async (args) => {
    return await UserModel.find(args);
}
exports.signIn = async (args) => {
    let user = await UserModel.findOne(args);
    if (!user) return null;
    const payload = { _id: user._id }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    user.cookie = accessToken;
    return user;
}
exports.signUp = async (args) => {
    let user = await UserModel.findOne(args);
    if (!user) user = await new UserModel(args).save();
    const payload = { _id: newUser._id }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    user.cookie = accessToken;
    return user;
}
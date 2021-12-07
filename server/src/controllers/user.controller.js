const UserModel = require("../models/user.model");
const bcrypt = require('bcryptjs');

exports.getUser = async (args) => {
    if (args?._id) return await UserModel.findById(args._id);
    else if (args?.user) return await UserModel.findById(args.user);
    return null;
}
exports.updateUser = async (args) => {
    const query = { user_name: args.user_name }
    return await UserModel.findOneAndUpdate(query, args);
}
exports.getUsers = async (args) => {
    return await UserModel.find(args);
}
exports.signIn = async (args) => {
    const { user_name, user_pass } = args;
    let user = await UserModel.findOne({ user_name });
    if (!user) return null;
    const isValid = await user.isCheckPassword(user_pass);
    if (!isValid) return null;
    return user;
}
exports.signUp = async (args) => {
    const { user_name, user_pass } = args;
    let user = await UserModel.findOne({ user_name });
    const isValid = await user.isCheckPassword(user_pass);
    if (!isValid) user = await new UserModel(args).save();
    return user;
}
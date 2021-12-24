const UserModel = require("../models/user.model");


exports.getUser = async (args) => {
    if (args?._id) return await UserModel.findById(args._id);
    else if (args?.user) return await UserModel.findById(args.user);
    return null;
}

exports.getUsers = async (args) => {
    return await UserModel.find(args);
}
exports.createUser = async (args) => {
    const newUser = new UserModel(args);
    return await newUser.save();
}
exports.updateUser = async (args) => {
    return await UserModel.findByIdAndUpdate(args._id, args);
}
exports.deleteUser = async (args) => {
    return await UserModel.findByIdAndDelete(args._id);
}
exports.signIn = async (args) => {
    const { user_name, user_pass } = args;
    let user = await UserModel.findOne({ user_name });
    if (!user) return null;
    const isValid = await user?.isCheckPassword(user_pass);
    if (!isValid) return null;
    return user;
}
exports.signUp = async (args) => {
    const { user_name } = args;
    let user = await UserModel.findOne({ user_name });
    if (user) return null;
    user = await new UserModel(args).save();
    return user;
}

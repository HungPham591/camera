const CameraModel = require("../models/camera.model");

exports.getCamera = async (args) => {
    return await CameraModel.findOne(args);
}
exports.getCameras = async (args) => {
    return await CameraModel.find(args);
}

exports.createCamera = async (args) => {
    if (!args.user) return null;
    const data = { user: args.user, ...args }
    const newCamera = new CameraModel(data);
    return await newCamera.save();
}
exports.updateCamera = async (args) => {
    if (!args.user) return null;
    return await CameraModel.findByIdAndUpdate(args._id, args);
}
exports.deleteCamera = async (args) => {
    if (!args.user) return null;
    return await CameraModel.findByIdAndRemove(args._id);
}
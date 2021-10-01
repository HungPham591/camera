const CameraModel = require("../models/camera.model");

exports.getCamera = async (args) => {
    return await CameraModel.findOne(args);
}
exports.getCameras = async (args) => {
    if (args.camera_name === undefined) return await CameraModel.find(args);
    if (args.camera_name.trim() === "") return await CameraModel.find()
    if (args.camera_name) return await CameraModel.find({ camera_name: { $regex: args.camera_name } });
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
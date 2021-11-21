const CameraModel = require("../models/camera.model");
const Event = require('../events/camera.event').eventBus;

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
    Event.emit('UPDATE_CAMERA', args);
    return await CameraModel.findByIdAndUpdate(args._id, args);
}
exports.deleteCamera = async (args) => {
    if (!args.user) return null;
    Event.emit('DELETE_CAMERA', args);
    return await CameraModel.findByIdAndRemove(args._id);
}
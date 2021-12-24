const FaceModel = require("../models/face.model");
const Event = require('../events/camera.event').eventBus;

exports.getFaces = async (args) => {
    return await FaceModel.find(args);
}
exports.createFace = async (args) => {
    const face = new FaceModel(args);
    return await face.save();
}
exports.deleteFace = async (args) => {
    Event.emit('DELETE_FACE', args);
    return await FaceModel.findByIdAndDelete(args);
}
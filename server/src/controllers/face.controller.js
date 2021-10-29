const FaceModel = require("../models/face.model");

exports.getFaces = async (args) => {
    return await FaceModel.find(args);
}
exports.createFace = async (args) => {
    const face = new FaceModel(args);
    return await face.save();
}
exports.deleteFace = async (args) => {
    return await FaceModel.findByIdAndDelete(args);
}
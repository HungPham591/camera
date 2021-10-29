const VideoModel = require("../models/video.model");

exports.getVideo = async (args) => {
    return await VideoModel.findOne(args);
}
exports.getVideos = async (args) => {
    return await VideoModel.find(args, {}, { limit: 5 });
}
exports.createVideo = async (args) => {
    const newVideo = new VideoModel(args);
    return await newVideo.save();
}
exports.deleteVideo = async (args) => {
    return await VideoModel.findByIdAndRemove(args._id);
}
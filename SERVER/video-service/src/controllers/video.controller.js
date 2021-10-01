const VideoModel = require("../models/video.model");

exports.getVideo = async (args) => {
    return await VideoModel.findOne(args);
}
exports.getVideos = async (args) => {
    return await VideoModel.find(args)
}
exports.createVideo = async (args) => {

}
exports.deleteVideo = async (args) => {

}
exports.streamVideo = async (args, req, res) => {
    let video = await VideoModel.findById(args._id);
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }

    const videoPath = `D:/js_project/QL_CAMERA/BE/src/public/data/${video.camera}/${video._id}.mp4`;
    const videoSize = fs.statSync(videoPath).size;

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);
}
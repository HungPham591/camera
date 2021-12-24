const fs = require("fs");
const path = require('path');

exports.uploadImg = async (req, res) => {
    try {
        let fileImage = req.files.img;
        let fileName = `${req.body.file_name}.jpg`;
        let dir = path.join(__dirname, '..', `public/${req.user}/face/`);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fileImage.mv(path.join(dir, fileName), (err) => console.log(err));
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}
exports.uploadMap = async (req, res) => {
    try {
        let fileImage = req.files.img;
        let fileName = `${req.body.file_name}.jpg`;
        let dir = path.join(__dirname, '..', `public/${req.user}/map/`);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fileImage.mv(path.join(dir, fileName), (err) => console.log(err));
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}
exports.streamVideo = async (req, res) => {
    let user = req.params.user_id;
    let camera_id = req.params.camera_id;
    let video_time = req.params.video_time;
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }

    const videoPath = path.join(__dirname, '..', `public/${user}/${camera_id}/data/${video_time}.mp4`);
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
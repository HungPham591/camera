const fs = require("fs");

exports.uploadImg = async (req, res) => {
    let id = req.body._id;
    let fileImage = req.files.img;
    let dir = "../BE/src/public/detect/" + id + "/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fileImage.mv(dir + fileImage.name, (err) => console.log(err));
}
exports.streamVideo = async (req, res) => {
    let param = req.params.id;
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }

    const videoPath = `${__dirname}/../public/data/${param}.mp4`;
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
const fs = require("fs");
const workerFarm = require('worker-farm')

exports.faceInVideo = (req, res) => {
    const fileImage = req.files.img;

    const video = req.body;
    const uriVideo = `../BE/src/public/data/${video.camera}/${video._id}.mp4`;

    if (!fs.existsSync(uriVideo)) {
        res.sendStatus(404);
        return;
    }

    //xu ly img thanh base64
    let faceBase64;

    const service = workerFarm(require.resolve('D:/js_project/QL_CAMERA/BE/src/rtsp.js'))
    service({ uriVideo, faceBase64 }, function (err, output) {
        res.send(output)
    })
}
const Stream = require("node-rtsp-stream");
const Recorder = require("node-rtsp-recorder").Recorder;
const { uploadFile } = require("./googledrive.modules");
const { uploadVideo } = require("./youtube.modules");
const fs = require("fs");
const workerFarm = require('worker-farm')

const streaming = (url, id) => {
    let port = 0;
    for (let i = 0; i < id.length; i++) {
        port += id.charCodeAt(i)
    }
    return new Stream({
        name: "name",
        streamUrl: url,
        wsPort: 9999 + port,
        ffmpegOptions: {
            "-nostats": "",
            "-r": 20,
        },
    });
};

const captureVideo = (camera, video) => {
    let rec = new Recorder({
        url: camera.camera_link,
        folder: `${__dirname}/../public/data`,
        fileName: video._id,
    });
    rec.startRecording();
    return rec;
};

const Camera = class {
    constructor(camera) {
        this.camera = camera;
        this.record = null;
        this.stream = null;
        this.filePath = "src/public/data/";
        this.video = null;
        this.user = camera.user;
    }
    startStream() {
        this.stream = streaming(this.camera.camera_link, this.camera._id.toString());
    }
    stopStream() {
        this.stream.stopStream();
    }
    startRecord() {
        let time = new Date().getTime();
        this.video = time;
        this.record = captureVideo(this.camera, time);
    }
    stopRecord() {
        this.record.stopRecording();
        this.record = null;
    }
    uploadDrive() {
        let filePath = this.filePath + this.video + ".mp4";
        let fileName = this.video;
        let folderId = this.camera.camera_drive;
        if (fs.existsSync(filePath)) {
            uploadFile(folderId, filePath, fileName, this.user);
        }
    }
    uploadYoutube() {
        let filePath = this.filePath + this.video + ".mp4";
        let fileName = this.video;
        if (fs.existsSync(filePath)) {
            uploadVideo(filePath, fileName, this.user);
        }
    }
    detect() {
        const service = workerFarm(require.resolve(__dirname + '\\detect_face.modules.js'))
        service(this.camera, () => { })
    }
};

module.exports = Camera;
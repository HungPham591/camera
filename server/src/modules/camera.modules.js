const Stream = require('./stream.modules');
const Recorder = require("node-rtsp-recorder").Recorder;
const { uploadFile } = require("./googledrive.modules");
const { uploadVideo } = require("./youtube.modules");
const fs = require("fs");
const workerFarm = require('worker-farm')
const Event = require('../events/camera.event').eventBus;
const resolve = require('path').resolve

const captureVideo = (url, folderPath, fileName) => {
    let rec = new Recorder({
        url: url,
        folder: folderPath,
        fileName: fileName,
    });
    rec.startRecording();
    return rec;
};

const Camera = class {
    constructor(camera) {
        this.camera = camera;
        this.record = null;
        this.path = resolve(`../server/src/public/${camera.user}/${camera._id}`);
        this.videoPath = `${this.path}\\data\\`;
        this.streamPath = `${this.path}\\stream\\`;
        this.video = null;
    }
    startStream() {
        this.stream = new Stream(this.camera, this.streamPath);
        this.stream?.startStream();
    }
    stopStream() {
        this.stream?.stopStream();
    }
    startRecord() {
        let time = new Date().getTime();
        this.video = time;
        this.record = captureVideo(this.camera.camera_link, this.videoPath, `${time}`);
    }
    stopRecord() {
        this.record?.stopRecording();
        this.record = null;
    }
    uploadDrive() {
        const filePath = `${this.videoPath}\\${this.video}.mp4`;
        const fileName = `${this.camera.camera_name}_${Date(this.video)}`;
        const token = this.camera.google_token;
        if (fs.existsSync(filePath)) {
            uploadFile(filePath, fileName, token);
        }
    }
    uploadYoutube() {
        const filePath = `${this.videoPath}\\${this.video}.mp4`;
        const fileName = `${this.camera.camera_name}_${Date(this.video)}`;
        const token = this.camera.google_token;
        if (fs.existsSync(filePath)) {
            uploadVideo(filePath, fileName, token);
        }
    }
    detect() {
        const service = workerFarm(require.resolve(__dirname + '\\detect_face.modules.js'))
        service(this.camera, () => { })
    }
    backup() {
        setInterval(() => {
            Event.emit('CREATE_VIDEO', { video_time: this.video, camera: this.camera._id });
            this.stopRecord();
            this.uploadDrive();
            this.uploadYoutube();
            this.startRecord();
        }, 60 * 1000);
    }
};

module.exports = Camera;
const Stream = require("node-rtsp-stream");
const Recorder = require("node-rtsp-recorder").Recorder;
const { uploadFile } = require("./googledrive.modules");
const { uploadVideo } = require("./youtube.modules");
const VideoModel = require("../models/video.model");
const UserModel = require("../models/user.model");
const fs = require("fs");
const workerFarm = require('worker-farm')

let timeBackUp = 60 * 1000;

const initStream = (link, id) => {
    let port = 0;
    for (let i = 0; i < id.length; i++) {
        port += id.charCodeAt(i)
    }
    return new Stream({
        name: "name",
        streamUrl: link,
        wsPort: 9999 + port,
        ffmpegOptions: {
            "-nostats": "",
            "-r": 20,
        },
    });
};

const initRecord = (camera, video) => {
    let rec = new Recorder({
        url: camera.camera_link,
        folder: "D:/js_project/QL_CAMERA/BE/src/public/data",
        name: camera._id + "",
        fileName: video._id,
    });
    rec.startRecording();
    return rec;
};

const saveYoutube = async (filePath, fileName, user_id) => {
    let user = await UserModel.findById(user_id)
    if (fs.existsSync(filePath)) {
        uploadVideo(filePath, fileName, user);
    }
};
const saveDrive = async (filePath, fileName, folderId, user_id) => {
    let user = await UserModel.findById(user_id)
    if (fs.existsSync(filePath)) {
        uploadFile(folderId, filePath, fileName, user);
    }
};

const Camera = class {
    constructor(camera) {
        this.camera = camera;
        this.record = null;
        this.stream = null;
        this.filePath = "src/public/data/" + camera._id + "/";
        this.video = null;
    }
    get _id() {
        return this.camera._id;
    }
    startStream() {
        this.stream = initStream(this.camera.camera_link, this.camera._id.toString());
    }
    stopStream() {
        this.stream.stopStream();
    }
    startRecord() {
        let time = new Date().getTime();
        new VideoModel({
            camera: this.camera._id,
            video_time: time,
        }).save((err, data) => {
            this.video = data;
            this.record = initRecord(this.camera, data);
        });
    }
    stopRecord() {
        this.record.stopRecording();
        this.record = null;
    }
    detect() {
        const service = workerFarm(require.resolve(__dirname + '\\detect_face.modules.js'))
        service(this.camera, () => { })
    }
    backUp() {
        this.startRecord();
        setInterval(() => {
            let filePath = this.filePath + this.video._id + ".mp4";
            let fileName = new Date(this.video.video_time).toString();
            let folderId = this.camera.camera_drive;

            this.stopRecord();
            saveDrive(filePath, fileName, folderId, this.camera.user);
            saveYoutube(filePath, fileName, this.camera.user);
            this.startRecord();
        }, timeBackUp);
    }
};

module.exports = Camera;

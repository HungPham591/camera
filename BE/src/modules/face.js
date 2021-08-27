const canvas = require("canvas");
const db = require("../config/db");
const fs = require("fs");
const ReportModel = require('../models/ReportModel');
const cv = require('opencv4nodejs');
const faceapi = require("face-api.js");
require('@tensorflow/tfjs-node')


const { Canvas, Image, ImageData } = canvas;

//danh sach nguoi quen
let descriptions = []
//danh sach so sanh
let listDetect = [];
let camera;
let url;
let loop = 0;

module.exports = async (input, callback) => {
    camera = input;
    url = camera.camera_link;
    createReport = callback;

    await loadEnvironment();
    await loadImage()
    captureFrame();
}
const loadEnvironment = async () => {
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    db.connect();

    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromDisk("./src/weights"),
        faceapi.nets.faceRecognitionNet.loadFromDisk("./src/weights"),
        faceapi.nets.faceLandmark68Net.loadFromDisk("./src/weights")
    ])
}
const loadImage = async () => {
    //khoi tao danh sach nguoi quen

    const dirPath = __dirname + '\\public\\face\\' + camera._id;
    let listFile = fs.readdirSync(dirPath)

    listFile = listFile.map((value, index) => {
        return canvas.loadImage(dirPath + '\\' + value)
    })
    listFile = await Promise.all(listFile);

    descriptions = listFile.map((img, index) => {
        return faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
    })
    descriptions = await Promise.all(descriptions);

    listDetect = descriptions;
}
const captureFrame = async () => {
    cap = new cv.VideoCapture(url)

    setInterval(() => {
        try {
            const frame = cap.read()
            let base64 = 'data:image/png;base64,' + cv.imencode('.jpg', frame).toString('base64');

            detect(base64);
            loop++;
            if (loop === 10) {
                loop = 0
                listDetect = [...descriptions]
            }

        } catch (err) {
            //neu khong co base64
            captureFrame();
            console.log(err);
            return;
        }
    }, 100);
}
const detect = async (base64) => {
    const img = new Image()
    img.src = base64;

    const resultDetect = await faceapi
        .detectAllFaces(img)
        .withFaceLandmarks()
        .withFaceDescriptors()

    if (!resultDetect.length) return;

    const faceMatcher = new faceapi.FaceMatcher(resultDetect);

    let bestMatch = 'unknown';
    //danh sach so sanh
    listDetect.forEach(face => {
        if (faceMatcher.findBestMatch(face.descriptor).label !== "unknown")
            bestMatch = '';
    })

    if (bestMatch === 'unknown') {
        //nguoi la
        listDetect = [...listDetect, ...resultDetect]

        const time = new Date().getTime();
        let report = await new ReportModel({ camera: camera._id, report_time: time }).save();
        let base64Data = base64.replace(/^data:image\/png;base64,/, "");
        fs.writeFile(
            __dirname + '\\public\\report\\' + report._id + ".png",
            base64Data,
            'base64',
            (err) => { console.log(err) }
        )
    }
}
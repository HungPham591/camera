const canvas = require("canvas");
const db = require("../config/db");
const fs = require("fs");
const ReportModel = require('../models/ReportModel');
const faceapi = require("face-api.js");
const ExtractFrame = require('./ExtractFrame')
require('@tensorflow/tfjs-node')

const { Canvas, Image, ImageData } = canvas;

//danh sach nguoi quen
let descriptions = []
//danh sach so sanh
let listDetect = [];
let camera;
let url;

module.exports = async (input, callback) => {
    camera = input;
    url = camera.camera_link;

    await loadEnvironment();
    await loadImage()
    captureFrame();
}
const loadEnvironment = async () => {
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    await db.connect();

    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromDisk("./src/weights"),
        faceapi.nets.faceRecognitionNet.loadFromDisk("./src/weights"),
        faceapi.nets.faceLandmark68Net.loadFromDisk("./src/weights"),
        faceapi.nets.ageGenderNet.loadFromDisk('./src/weights')
    ])
}
const loadImage = async () => {
    //khoi tao danh sach nguoi quen

    const dirPath = process.env.HOME_PATH + '\\src\\public\\face\\' + camera._id;
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
const captureFrame = () => {
    const extractFrame = new ExtractFrame(url);
    setInterval(() => {
        if (extractFrame.getFrame() !== '') {
            const base64 = 'data:image/png;base64,' + extractFrame.getFrame().toString('base64');
            detect(base64);
        }
    }, 1000);
}
const detect = async (base64) => {
    try {
        const img = new Image()
        img.src = base64;

        const resultDetect = await faceapi
            .detectAllFaces(img)
            .withFaceLandmarks()
            .withFaceDescriptors()
            .withAgeAndGender();

        if (!resultDetect.length) return;

        const faceMatcher = new faceapi.FaceMatcher(resultDetect);

        let bestMatch = 'unknown';

        listDetect.forEach(face => {
            if (faceMatcher.findBestMatch(face.descriptor).label !== "unknown")
                bestMatch = '';
        })

        if (bestMatch === 'unknown') {
            listDetect = [...listDetect, ...resultDetect]
            createReport(resultDetect)
        }
    } catch (err) {
    }
}

const createReport = (resultDetect) => {
    const report_description = resultDetect.map(value => {
        return { gender: value.gender, age: value.age };
    })
    new ReportModel({ camera: camera._id, report_description }).save();
}
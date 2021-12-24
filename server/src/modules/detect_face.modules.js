const canvas = require("canvas");
const fs = require("fs");
const faceapi = require("face-api.js");
const ExtractFrame = require('./extract_frame.modules')
require('@tensorflow/tfjs-node')
const { createClient, sendRPCMessage, sendMessage } = require('./rabbitmq.modules')
const resolve = require('path').resolve

const { Canvas, Image, ImageData } = canvas;
const amqserver = 'amqp://localhost:5672/'

//danh sach nguoi quen
let descriptions = []
//danh sach so sanh
let listDetect = [];
let camera;
let url;
let channel;
let exit;

module.exports = async (input, callback) => {
    camera = input;
    exit = callback;
    url = camera.camera_link;

    await loadEnvironment();
    await loadImage()
    captureFrame();
    //
    refreshListDetect();
}
const refreshListDetect = () => {
    setInterval(() => {
        listDetect = descriptions;
    }, 60 * 1000);
}
const loadEnvironment = async () => {
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    channel = await createClient(amqserver);

    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromDisk("./src/weights"),
        faceapi.nets.faceRecognitionNet.loadFromDisk("./src/weights"),
        faceapi.nets.faceLandmark68Net.loadFromDisk("./src/weights"),
        faceapi.nets.ageGenderNet.loadFromDisk('./src/weights')
    ])
}
const connectAmqServer = async () => {
    channel = await createClient(amqserver);
    await Promise.all([
        channel.assertQueue('DELETE_CAMERA'),
        channel.assertQueue('UPDATE_CAMERA'),
    ])
    channel.consume('DELETE_CAMERA', msg => onDeleteCamera(msg))
    channel.consume('UPDATE_CAMERA', msg => { })
}
const onDeleteCamera = (msg) => {
    const data = JSON.parse(msg.content);
    if (data._id === camera._id) exit();
}
const loadImage = async () => {
    try {
        //khoi tao danh sach nguoi quen

        const dirPath = resolve(`../server/src/public/${camera.user}/face/`);
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
    } catch (err) {
        console.log(err);
    }
}
const captureFrame = () => {
    const extractFrame = new ExtractFrame(url);
    setInterval(() => {
        if (extractFrame.getFrame() !== '' && checkWorkingTime()) {
            const base64 = 'data:image/png;base64,' + extractFrame.getFrame().toString('base64');
            detect(base64);
        }
    }, 1000);
}
const checkWorkingTime = () => {
    const currentTime = new Date().getTime();
    if (!camera?.working_time) return true;
    if (currentTime >= camera?.working_time[0] && currentTime <= camera?.working_time[1]) return true;
    return true;
}

const checkFaceInsidePolygon = (point, polygon) => {
    //[ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ]
    let x = point[0], y = point[1];

    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i][0], yi = polygon[i][1];
        let xj = polygon[j][0], yj = polygon[j][1];

        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};
const detect = async (base64) => {
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
        if (!face?.descriptor) return;
        if (faceMatcher.findBestMatch(face?.descriptor).label !== "unknown")
            bestMatch = '';
    })

    if (bestMatch === 'unknown') {
        listDetect = [...listDetect, ...resultDetect]
        createReport(resultDetect, base64);
    }
}

const createReport = async (resultDetect, base64) => {
    const report_description = resultDetect.map(value => {
        return { gender: value.gender, age: value.age };
    })
    const report = { camera: camera._id, report_description, img: base64, user: camera.user }
    sendMessage(channel, report, 'NEW_NOTIFICATION')
    const newReport = await sendRPCMessage(channel, report, 'CREATE_REPORT');

    base64ToFile(base64, newReport?._id)
}
const base64ToFile = (base64, id) => {
    const base64Data = base64.replace(/^data:image\/png;base64,/, "");
    const dirPath = resolve(`../server/src/public/${camera.user}/${camera._id}/report/`);
    const filePath = `${dirPath}\\${id}.png`;
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFile(filePath, base64Data, 'base64', () => { });
}
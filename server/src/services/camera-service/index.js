require('dotenv').config({ path: './.env.camera-service' });
const app = require('./app');
const { createClient, responseMessage, sendRPCMessage, sendMessage } = require('../../modules/rabbitmq.modules')
const controller = require('../../controllers/camera.controller');
const Event = require('../../events/camera.event').eventBus;
const fs = require('fs');
const path = require("path");

const CameraModel = require("../../models/camera.model");
const Camera = require("../../modules/camera.modules");

const port = process.env.PORT || 4000;
const amqserver = 'amqp://localhost:5672/'

const db = require("../../db");

let channelAmq;

const connectAmqserver = async () => {
    channelAmq = await createClient(amqserver);
    await Promise.all([
        channelAmq.assertQueue('GET_CAMERA'),
        channelAmq.assertQueue('GET_CAMERAS'),
        channelAmq.assertQueue('CREATE_CAMERA'),
        channelAmq.assertQueue('UPDATE_CAMERA'),
        channelAmq.assertQueue('DELETE_CAMERA'),
        channelAmq.assertQueue('DELETE_CAMERAS')
    ])
    channelAmq.consume('GET_CAMERA', msg => response(channelAmq, msg, controller.getCamera))
    channelAmq.consume('GET_CAMERAS', msg => response(channelAmq, msg, controller.getCameras))
    channelAmq.consume('CREATE_CAMERA', msg => response(channelAmq, msg, controller.createCamera))
    channelAmq.consume('UPDATE_CAMERA', msg => response(channelAmq, msg, controller.updateCamera))
    channelAmq.consume('DELETE_CAMERA', msg => response(channelAmq, msg, controller.deleteCamera))
    channelAmq.consume('DELETE_CAMERAS', msg => response(channelAmq, msg, controller.deleteCamerasByLocation))
}
const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    if (!response) return responseMessage(channel, msg, null);
    responseMessage(channel, msg, response);
}
//controll camera
let listCamera = [];

const startAllCamera = async () => {
    let cameras = await CameraModel.find();
    cameras.forEach((data) => {
        let camera = new Camera(data);
        listCamera.push(camera);
        camera.startStream();
        // camera.startRecord()
        // camera.backup();
        // camera.detect();
    });
    console.log('start all camera');
};


const startServer = async () => {
    await db.connect();
    connectAmqserver();
    startAllCamera();
}

startServer();

Event.on("NEW_CAMERA", function (doc) {
    let camera = new Camera(doc);
    camera.startStream();
    // camera.startRecord()
    // camera.backup();
    // camera.detect();
    listCamera.push(camera);
});
Event.on("DELETE_CAMERA", function (doc) {
    const index = listCamera.findIndex(camera => camera?.camera?._id?.toString() === doc?._id);
    if (index === -1) return;
    const camera = listCamera[index];
    camera.stopStream();
    camera.stopRecord();
    listCamera.slice(index, 1);

    const dataPath = path.join(__dirname, '..', '..', "public", doc?.user, doc?._id);
    fs.rmdirSync(dataPath, { recursive: true, force: true });
});
Event.on("UPDATE_CAMERA", function (doc) {
    const index = listCamera.findIndex(camera => camera?.camera?._id?.toString() === doc?._id);
    if (index === -1) return;
    const camera = listCamera[index];
    if (doc.camera_link === camera?.camera?.camera_link || !camera) return;
    camera.stopStream();
    camera.stopRecord();
    camera.camera = doc;
    camera.startStream();
    camera.startRecord();
});
Event.on("CREATE_VIDEO", function (doc) {
    if (!channelAmq && typeof doc !== 'object') return;
    sendMessage(channelAmq, doc, 'CREATE_VIDEO');
});

app.listen(port, () => {
    console.log('camera service listen at port ' + port)
})

require('dotenv').config({ path: './.env.camera-service' });
const app = require('./app');
const { createClient, responseMessage, sendRPCMessage, sendMessage } = require('../../modules/rabbitmq.modules')
const controller = require('../../controllers/camera.controller');
const Event = require('../../events/camera.event').eventBus;

const CameraModel = require("../../models/camera.model");
const Camera = require("../../modules/camera.modules");

const port = process.env.PORT || 4000;
const amqserver = 'amqp://localhost:5672/'

const db = require("../../db");

db.connect();

//
let channelAmq;

//
const connectAmqserver = async () => {
    channelAmq = await createClient(amqserver);
    await Promise.all([
        channelAmq.assertQueue('GET_CAMERA'),
        channelAmq.assertQueue('GET_CAMERAS'),
        channelAmq.assertQueue('CREATE_CAMERA'),
        channelAmq.assertQueue('UPDATE_CAMERA'),
        channelAmq.assertQueue('DELETE_CAMERA')
    ])
    channelAmq.consume('GET_CAMERA', msg => response(channelAmq, msg, controller.getCamera))
    channelAmq.consume('GET_CAMERAS', msg => response(channelAmq, msg, controller.getCameras))
    channelAmq.consume('CREATE_CAMERA', msg => response(channelAmq, msg, controller.createCamera))
    channelAmq.consume('UPDATE_CAMERA', msg => response(channelAmq, msg, controller.updateCamera))
    channelAmq.consume('DELETE_CAMERA', msg => response(channelAmq, msg, controller.deleteCamera))
}
const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    responseMessage(channel, msg, response);
}
//controll camera
let listCamera = [];

const initListCamera = async () => {
    let cameras = await CameraModel.find();
    cameras.forEach((data) => {
        let camera = new Camera(data);
        listCamera.push(camera);
    });
};
const startAllCamera = async () => {
    console.log('start all camera')
    await initListCamera();
    listCamera.forEach((camera) => {
        camera.startStream();
        // camera.startRecord()
        // camera.backup();
        camera.detect();
    });
};

const startServer = async () => {
    await connectAmqserver();
    await startAllCamera();
    Event.on("CREATE_VIDEO", function (doc) {
        sendMessage(channelAmq, doc, 'CREATE_VIDEO');
    });
}

startServer();

app.listen(port, () => {
    console.log('camera service listen at port ' + port)
})

const app = require('./app');
const { createClient, responseMessage } = require('./modules/rabbitmq.modules')
const controller = require('./controllers/camera.controller');

const CameraModel = require("./models/camera.model");
const Camera = require("./modules/camera.modules");

require('dotenv').config();

const port = process.env.PORT || 4000;
const amqserver = 'amqp://localhost:5672/'

const db = require("./db");

db.connect();

createClient(amqserver).then(async channel => {
    await Promise.all([
        channel.assertQueue('GET_CAMERA'),
        channel.assertQueue('GET_CAMERAS'),
        channel.assertQueue('CREATE_CAMERA'),
        channel.assertQueue('UPDATE_CAMERA'),
        channel.assertQueue('DELETE_CAMERA')
    ])
    channel.consume('GET_CAMERA', msg => {
        response(channel, msg, controller.getCamera);
    })
    channel.consume('GET_CAMERAS', msg => {
        response(channel, msg, controller.getCameras);
    })
    channel.consume('CREATE_CAMERA', msg => {
        response(channel, msg, controller.createCamera);
    })
    channel.consume('UPDATE_CAMERA', msg => {
        response(channel, msg, controller.updateCamera);
    })
    channel.consume('DELETE_CAMERA', msg => {
        response(channel, msg, controller.deleteCamera);
    })
});

const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    responseMessage(channel, msg, response);
}

//controll camera

let listCamera = [];
let timeBackup = 60 * 1000;

const initListCamera = async () => {
    let cameras = await CameraModel.find();
    let users = [];
    cameras.forEach((camera) => {
        camera.user = users.find(user => user._id === camera.user);
        let camera = new Camera(camera);
        listCamera.push(camera);
    });
};
const startStreamingAllCamera = async () => {
    console.log('start all camera')
    await initListCamera();
    listCamera.forEach((camera) => {
        camera.startStream();
        // camera.detect();
    });
};
const uploadVideoToCloud = () => {
    setInterval(() => {
        listCamera.forEach(camera => {
            camera.stopRecord();
            camera.uploadDrive();
            camera.uploadYoutube();
            camera.startRecord();
        });
    }, timeBackup);
}
// startStreamingAllCamera();
// uploadVideoToCloud();

app.listen(port, () => {
    console.log('camera service listen at port ' + port)
})

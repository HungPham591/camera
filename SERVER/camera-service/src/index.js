const app = require('./app');
const { createClient, responseMessage } = require('./modules/rabbitmq.modules')
const controller = require('./controllers/camera.controller');

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


app.listen(port, () => {
    console.log('camera service listen at port ' + port)
})


// const CameraModel = require("../models/camera.model");
// const Camera = require("./camera.modules");
// const Events = require('../events/camera.event').eventBus;

// let listCamera = [];

// const initListCamera = async () => {
//     let list = await CameraModel.find();
//     list.forEach((data) => {
//         let camera = new Camera(data);
//         listCamera.push(camera);
//     });
// };
// const start = async () => {
//     console.log('start all camera')
//     await initListCamera();
//     listCamera.forEach((camera) => {
//         camera.startStream();
//         // camera.detect();
//         // camera.backUp();
//     });
// };

// Events.on("INSERT_CAMERA", function (doc) {
// });
// Events.on("DELETE_CAMERA", function (doc) {
// });

// module.exports = { start };

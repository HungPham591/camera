const CameraModel = require("../models/camera.model");
const Camera = require("./camera.modules");
const Events = require('../events/camera.event').eventBus;

let listCamera = [];

const initListCamera = async () => {
    let list = await CameraModel.find();
    list.forEach((data) => {
        let camera = new Camera(data);
        listCamera.push(camera);
    });
};
const start = async () => {
    console.log('start all camera')
    await initListCamera();
    listCamera.forEach((camera) => {
        camera.startStream();
        // camera.detect();
        // camera.backUp();
    });
};

Events.on("INSERT_CAMERA", function (doc) {
});
Events.on("DELETE_CAMERA", function (doc) {
});

module.exports = { start };

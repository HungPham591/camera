const CameraModel = require("../models/CameraModel");
const Camera = require("./camera");
const Events = require('../Events/Camera').eventBus;

let listCamera = [];
let timeBackUp = 60 * 1000;

const initListCamera = async () => {
    let list = await CameraModel.find();
    list.forEach((data) => {
        let camera = new Camera(data);
        listCamera.push(camera);
    });
};

const newCamera = (data) => {
    let camera = new Camera(data);
    camera.startStream();
    // camera.backUp();
    listCamera.push(camera);
};

const getCamera = (camera_id) => {
    return listCamera.find((camera) => camera.camera_id == camera_id);
};
const getCameraList = () => {
    return listCamera;
};
const getTimeBackUp = () => {
    return timeBackUp;
};
const setTimeBackUp = (time) => {
    timeBackUp = time;
};

const start = async () => {
    console.log('start')
    await initListCamera();
    listCamera.forEach((camera) => {
        camera.startStream();
        // camera.detect();
        // camera.backUp();
    });
};

Events.on("INSERT_CAMERA", function (doc) {
    console.log('new camera ' + doc._id);
});
Events.on("DELETE_CAMERA", function (doc) {
    console.log('remove camera ' + doc._id);
});

module.exports = {
    start,
    getCamera,
    getCameraList,
    getTimeBackUp,
    setTimeBackUp,
    newCamera
};

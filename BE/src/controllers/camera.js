const CameraModel = require("../models/CameraModel");
const fs = require("fs");

exports.getCamera = async (req, res) => {
    let query = req.body;
    let listCamera = await CameraModel.find(query);
    res.send(listCamera);
}
exports.getByName = async (req, res) => {
    let listCamera = await CameraModel.find(req.body);
    res.send(listCamera)
}
exports.getByUser = async (req, res) => {
    let listCamera = await CameraModel.find(req.body);
    res.send(listCamera)
}
exports.createCamera = async (req, res) => {
    const camera = new CameraModel(req.body);
    let data = await camera.save();
    res.send(data);
}
exports.updateCamera = async (req, res) => {
    let camera = await CameraModel.findByIdAndUpdate(req.body._id, req.body);
    res.send(camera);
}
exports.deleteCamera = async (req, res) => {
    let camera_id = req.body._id;

    let result = await CameraModel.findByIdAndRemove(camera_id);
    res.send(result)
}
exports.createFace = async (req, res) => {
    let id = req.body._id;
    let fileImage = req.files.img;
    let dir = "../BE/src/public/detect/" + id + "/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fileImage.mv(dir + fileImage.name, (err) => console.log(err));
}
const CameraModel = require("../models/CameraModel");
const fs = require("fs");
const drive = require("../googledrive");
const UserModel = require("../models/UserModel");

exports.getCamera = (req, res) => {
    let query = req.body;
    let listCamera = await CameraModel.find(query);
    res.send(listCamera);
}
exports.createCamera = (req, res) => {
    const camera = new CameraModel(req.body);
    let data = await camera.save();
    let user = await UserModel.findById(data.user);
    let folder_name;

    folder_name = "camera " + data._id;
    listCamera.newCamera(data);

    data.camera_drive = await drive.createFolder(folder_name, user);
    await CameraModel.findByIdAndUpdate(data._id, data)

    res.send(data);
}
exports.updateCamera = (req, res) => {
    let camera = await CameraModel.findByIdAndUpdate(req.body._id, req.body);
    res.send(camera);
}
exports.deleteCamera = (req, res) => {
    let camera_id = req.body._id;

    let result = await CameraModel.findByIdAndRemove(camera_id);
    res.send(result)
}
exports.createFace = (req, res) => {
    let id = req.body._id;
    let fileImage = req.files.img;
    let dir = "../BE/src/public/detect/" + id + "/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fileImage.mv(dir + fileImage.name, (err) => console.log(err));
}
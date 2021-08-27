const express = require("express");
const router = express.Router();
const CameraModel = require("../models/CameraModel");
const fs = require("fs");
const drive = require("../modules/googledrive");
const UserModel = require("../models/UserModel");

const cameraRouter = (app, listCamera) => {
    router.get("/", async (req, res, next) => {
        let query = req.body;
        let listCamera = await CameraModel.find(query);
        res.send(listCamera);
    });
    router.post("/", async (req, res, next) => {
        const camera = new CameraModel(req.body);
        let data = await camera.save();
        let user = await UserModel.findById(data.user);
        let folder_name;

        folder_name = "camera " + data._id;
        listCamera.newCamera(data);

        data.camera_drive = await drive.createFolder(folder_name, user);
        await CameraModel.findByIdAndUpdate(data._id, data)

        res.send(data);
    });
    router.put("/", async (req, res, next) => {
        let camera = await CameraModel.findByIdAndUpdate(req.body._id, req.body);
        res.send(camera);
    });
    router.delete("/", async (req, res, next) => {
        let camera_id = req.body._id;

        let result = await CameraModel.findByIdAndRemove(camera_id);
        res.send(result)
    });

    router.post("/img", (req, res, next) => {
        let id = req.body._id;
        let fileImage = req.files.img;
        let dir = "../BE/src/public/detect/" + id + "/";
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        fileImage.mv(dir + fileImage.name, (err) => console.log(err));
    });

    app.use("/camera", router);
};

module.exports = cameraRouter;

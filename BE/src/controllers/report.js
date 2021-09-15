const ReportModel = require("../models/ReportModel");
const CameraModel = require('../models/CameraModel');

exports.getReport = async (req, res) => {
    let listCamera = await CameraModel.find(req.body, { _id: 1 });
    listCamera = listCamera.map(value => {
        return value._id
    })
    const listReport = await ReportModel.find({ camera: { $in: listCamera } }).populate('camera')
    res.send(listReport);
}
exports.getReportByVideo = async (req, res) => {
    let { start, end } = req.body;
    start = new Date(start);
    end = new Date(end);
    let listReport = await ReportModel.find({ updatedAt: { $gt: start, $lt: end } });
    res.send(listReport);
}
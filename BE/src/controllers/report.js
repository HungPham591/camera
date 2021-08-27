const ReportModel = require("../models/ReportModel");

exports.getReport = async (req, res) => {
    let query = req.body;
    let listReport = await ReportModel.find(query);
    res.send(listReport);
}
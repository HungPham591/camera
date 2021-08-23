const ReportModel = require("../models/ReportModel");

exports.getReport = (res, req) => {
    let query = req.body;
    let listReport = await ReportModel.find(query);
    res.send(listReport);
}
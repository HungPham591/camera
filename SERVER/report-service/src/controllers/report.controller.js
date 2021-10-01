const ReportModel = require("../models/report.model");

exports.getReport = async (args) => {
    return await ReportModel.findOne(args);
}
exports.getReports = async (args) => {
    if (args.start && args.end) {
        const start = new Date(args.start);
        const end = new Date(args.end);
        return await ReportModel.find({ updatedAt: { $gt: start, $lt: end } });
    }
    return await ReportModel.find(args);
}
exports.createReport = async (args) => {

}
exports.deleteReport = async (args) => {

}
const ReportModel = require("../models/report.model");

exports.getReport = async (args) => {
    return await ReportModel.findOne(args);
}
exports.getReports = async (args) => {
    if (args.start && args.end) {
        const start = new Date(args.start).toISOString();
        const end = new Date(args.end).toISOString();
        return await ReportModel.find({ updatedAt: { $gt: start, $lt: end } });
    }
    return await ReportModel.find(args);
}
exports.createReport = async (args) => {
    const report = new ReportModel(args);
    return await report.save();
}
exports.deleteReport = async (args) => {
    return await ReportModel.findByIdAndDelete(args);
}
exports.deleteReportByCamera = async (args) => {
    const query = { camera: args._id };
    return await ReportModel.deleteMany(query);
}
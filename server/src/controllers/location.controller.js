const LocationModel = require("../models/location.model");

exports.getLocation = async (args) => {
    return await LocationModel.findOne(args);
}
exports.getLocations = async (args) => {
    if (!args?.user) return null;
    return await LocationModel.find(args);
}
exports.createLocation = async (args) => {
    if (!args?.user) return null;
    const data = { user: args.user, ...args }
    const Location = new LocationModel(data);
    return await Location.save();
}
exports.deleteLocation = async (args) => {
    return await LocationModel.findByIdAndDelete(args);
}
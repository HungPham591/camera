const LocationModel = require("../models/location.model");

exports.getLocation = async (args) => {
    return await LocationModel.findOne(args);
}
exports.getLocations = async (args) => {
    if (!args?.user) return null;
    if (args.location_name === undefined) return await LocationModel.find(args);
    if (args.location_name.trim() === "") return await LocationModel.find()
    if (args.location_name) return await LocationModel.find({ location_name: { $regex: args.location_name } });
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
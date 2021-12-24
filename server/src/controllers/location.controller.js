const LocationModel = require("../models/location.model");
const Event = require('../events/camera.event').eventBus;

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
    Event.emit('DELETE_LOCATION', args);
    return await LocationModel.findByIdAndDelete(args);
}
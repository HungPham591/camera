const RoleModel = require("../models/Role.model");

exports.getRole = async (args) => {
    return await RoleModel.findOne(args);
}
exports.getRoles = async (args) => {
    return await RoleModel.find(args);
}
exports.createRole = async (args) => {
    const face = new RoleModel(args);
    return await face.save();
}
exports.updateRole = async (args) => {
}
exports.deleteRole = async (args) => {
    return await RoleModel.findByIdAndDelete(args);
}
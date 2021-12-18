const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Role = new Schema({
    role_code: { type: String },
    role_name: { type: String },
    role_description: { type: String }
}, { timestamps: true });


module.exports = mongoose.model("roles", Role);

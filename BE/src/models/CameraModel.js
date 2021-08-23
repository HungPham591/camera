const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Camera = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "users" },
    camera_name: { type: String },
    camera_drive: { type: String },
    camera_link: { type: String },
    camera_location: { type: Array },
    camera_public: { type: Boolean },
    listFace: [String]
});

module.exports = mongoose.model("cameras", Camera);

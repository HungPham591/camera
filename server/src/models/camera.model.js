const mongoose = require("mongoose");
const drive = require("../modules/googledrive.modules");
const Schema = mongoose.Schema;

const CameraSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "users" },
        camera_name: { type: String },
        camera_link: { type: String },
        camera_location: { type: Array },
        camera_public: { type: Boolean },
        google_token: { type: String },
    },
    { timestamps: true }
);

const CameraModel = mongoose.model("cameras", CameraSchema);

module.exports = CameraModel;

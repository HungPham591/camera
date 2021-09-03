const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Event = require('../Events/Camera').eventBus;

const CameraSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "users" },
        camera_name: { type: String },
        camera_drive: { type: String },
        camera_link: { type: String },
        camera_location: { type: Array },
        camera_public: { type: Boolean },
        listFace: [String]
    },
    { timestamps: true }
);

CameraSchema.post('deleteOne', (doc) => {
    Event.emit('DELETE_CAMERA', doc);
})

CameraSchema.post('save', (doc) => {
    Event.emit('INSERT_CAMERA', doc);
})

const CameraModel = mongoose.model("cameras", CameraSchema);

module.exports = CameraModel;

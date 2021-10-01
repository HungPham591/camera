const mongoose = require("mongoose");
const drive = require("../modules/googledrive.modules");
// const UserModel = require("./user.model");
const Schema = mongoose.Schema;
const Event = require('../events/camera.event').eventBus;

const CameraSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "users" },
        camera_name: { type: String },
        camera_drive: { type: String },
        camera_link: { type: String },
        camera_location: { type: Array },
        camera_public: { type: Boolean },
    },
    { timestamps: true }
);

CameraSchema.pre('save', async function (next) {
    const self = this;
    // let user = await UserModel.findById(self.user);
    // let folder_name = "camera " + self._id;
    // self.camera_drive = await drive.createFolder(folder_name, user);
    next();
})

CameraSchema.post('deleteOne', (doc) => {
    Event.emit('DELETE_CAMERA', doc);
})

CameraSchema.post('save', (doc) => {
    Event.emit('INSERT_CAMERA', doc);
})

const CameraModel = mongoose.model("cameras", CameraSchema);

module.exports = CameraModel;

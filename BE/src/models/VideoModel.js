const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Video = new Schema({
  camera: { type: Schema.Types.ObjectId, ref: "cameras" },
  video_time: { type: Number },
});

module.exports = mongoose.model("videos", Video);

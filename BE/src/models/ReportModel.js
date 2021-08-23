const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Report = new Schema({
    camera: { type: Schema.Types.ObjectId, ref: 'cameras' },
    report_time: { type: Number },
});


module.exports = mongoose.model("reports", Report);

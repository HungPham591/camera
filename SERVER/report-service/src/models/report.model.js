const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Report = new Schema({
    camera: { type: Schema.Types.ObjectId, ref: 'cameras' },
    report_time: { type: Number },
    report_description: { type: Array }
}, { timestamps: true });

Report.post('save', (doc) => {
})

module.exports = mongoose.model("reports", Report);

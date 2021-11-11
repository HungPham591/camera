const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Location = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    location_name: { type: String },
    location_coordinate: { type: Array },
}, { timestamps: true });

Location.post('save', (doc) => {
})

module.exports = mongoose.model("locations", Location);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Face = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    face_name: { type: String }
}, { timestamps: true });

Face.post('save', (doc) => {
})

module.exports = mongoose.model("faces", Face);

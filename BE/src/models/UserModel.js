const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    user_gmail: { type: String },
    user_pass: { type: String },
    google_id: { type: String },
    google_token: { type: String },
    access_token: { type: String },
}, { timestamps: true });

User.pre('save', function (next) {
    next()
})

User.post('deleteOne', (doc) => {

})

module.exports = mongoose.model("users", User);

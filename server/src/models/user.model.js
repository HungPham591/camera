const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    user_name: { type: String },
    user_pass: { type: String },
    google_token: { type: String },
    user_role: { type: Boolean, default: false },
}, { timestamps: true });

User.pre('save', async function (next) {
})

User.post('deleteOne', (doc) => {

})

module.exports = mongoose.model("users", User);

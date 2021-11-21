const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const User = new Schema({
    user_name: { type: String },
    user_pass: { type: String },
    google_token: { type: String },
    user_role: { type: Boolean, default: false },
}, { timestamps: true });

User.pre('save', async function (next) {
    const user = this;
    user.user_pass = await bcrypt.hash(user.user_pass, 8);
})

User.pre('findOne', async (next) => {
    if (this.user_pass) this.user_pass = await bcrypt.hash(user.user_pass, 8);
    next();
})

module.exports = mongoose.model("users", User);

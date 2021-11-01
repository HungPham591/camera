const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema({
    blog_title: { type: String, required: true },
    blog_content: { type: String, required: true }
}, { timestamps: true });

Blog.post('save', (doc) => {
})

module.exports = mongoose.model("blogs", Blog);

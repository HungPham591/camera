const BlogModel = require("../models/blog.model");

exports.getBlog = async (args) => {
    return await BlogModel.findOne(args);
}
exports.getBlogs = async (args) => {
    return await BlogModel.find(args);
}
exports.createBlog = async (args) => {
    const face = new BlogModel(args);
    return await face.save();
}
exports.updateBlog = async (args) => {

}
exports.deleteBlog = async (args) => {
    return await BlogModel.findByIdAndDelete(args);
}
require('dotenv').config({ path: './.env.blog-service' });
const app = require('./app');
const { createClient, responseMessage } = require('../../modules/rabbitmq.modules')
const controller = require('../../controllers/blog.controller.js');

const port = process.env.PORT || 4005;
const amqserver = 'amqp://localhost:5672/'

const db = require("../../db");

db.connect();

createClient(amqserver).then(async channel => {
    await Promise.all([
        channel.assertQueue('GET_BLOG'),
        channel.assertQueue('GET_BLOGS'),
        channel.assertQueue('CREATE_BLOG'),
        channel.assertQueue('UPDATE_BLOG'),
        channel.assertQueue('DELETE_BLOG')
    ])
    channel.consume('GET_BLOG', msg => {
        response(channel, msg, controller.getBlog);
    })
    channel.consume('GET_BLOGS', msg => {
        response(channel, msg, controller.getBlogs);
    })
    channel.consume('CREATE_BLOG', msg => {
        response(channel, msg, controller.createBlog);
    })
    channel.consume('UPDATE_BLOG', msg => {
        response(channel, msg, controller.updateBlog);
    })
    channel.consume('DELETE_BLOG', msg => {
        response(channel, msg, controller.deleteBlog);
    })
});

const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    responseMessage(channel, msg, response);
}


app.listen(port, () => {
    console.log('blog service listen at port ' + port)
})
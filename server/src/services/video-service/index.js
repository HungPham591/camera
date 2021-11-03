require('dotenv').config({ path: './.env.video-service' });
const app = require('./app');
const { createClient, responseMessage } = require('../../modules/rabbitmq.modules')
const controller = require('../../controllers/video.controller');

const port = process.env.PORT || 4004;
const amqserver = 'amqp://localhost:5672/'

const db = require("../../db");

db.connect();

createClient(amqserver).then(async channel => {
    await Promise.all([
        channel.assertQueue('GET_VIDEO'),
        channel.assertQueue('GET_VIDEOS'),
        channel.assertQueue('CREATE_VIDEO'),
        channel.assertQueue('DELETE_VIDEO'),
    ])
    channel.consume('GET_VIDEO', msg => response(channel, msg, controller.getVideo))
    channel.consume('GET_VIDEOS', msg => response(channel, msg, controller.getVideos))
    channel.consume('CREATE_VIDEO', msg => response(channel, msg, controller.createVideo))
    channel.consume('DELETE_VIDEO', msg => response(channel, msg, controller.deleteVideo))
});

const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    responseMessage(channel, msg, response);
}


app.listen(port, () => {
    console.log('video service listen at port ' + port)
})

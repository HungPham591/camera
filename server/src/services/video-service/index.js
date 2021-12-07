require('dotenv').config({ path: './.env.video-service' });
const app = require('./app');
const { createClient, responseMessage } = require('../../modules/rabbitmq.modules')
const controller = require('../../controllers/video.controller');

const port = process.env.PORT || 4004;
const amqserver = 'amqp://localhost:5672/'

const db = require("../../db");


const connectAmqserver = async () => {
    const channel = await createClient(amqserver);
    await Promise.all([
        channel.assertQueue('GET_VIDEO'),
        channel.assertQueue('GET_VIDEOS'),
        channel.assertQueue('CREATE_VIDEO'),
        channel.assertQueue('DELETE_VIDEO'),
        channel.assertQueue('DELETE_VIDEOS'),
    ])
    channel.consume('GET_VIDEO', msg => response(channel, msg, controller.getVideo))
    channel.consume('GET_VIDEOS', msg => response(channel, msg, controller.getVideos))
    channel.consume('CREATE_VIDEO', msg => response(channel, msg, controller.createVideo))
    channel.consume('DELETE_VIDEO', msg => response(channel, msg, controller.deleteVideo))
    channel.consume('DELETE_VIDEOS', msg => response(channel, msg, controller.deleteVideoByCamera))
}
const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    if (!response) return responseMessage(channel, msg, null);
    responseMessage(channel, msg, response);
}
const startServer = async () => {
    await db.connect();
    connectAmqserver();
}
startServer();

app.listen(port, () => {
    console.log('video service listen at port ' + port)
})

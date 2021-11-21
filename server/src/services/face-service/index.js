require('dotenv').config({ path: './.env.face-service' });
const app = require('./app');
const { createClient, responseMessage } = require('../../modules/rabbitmq.modules')
const controller = require('../../controllers/face.controller.js');

const port = process.env.PORT || 4006;
const amqserver = 'amqp://localhost:5672/'

const db = require("../../db");


const connectAmqserver = async () => {
    const channel = await createClient(amqserver);
    await Promise.all([
        channel.assertQueue('GET_FACES'),
        channel.assertQueue('CREATE_FACE'),
        channel.assertQueue('DELETE_FACE')
    ])
    channel.consume('GET_FACES', msg => response(channel, msg, controller.getFaces))
    channel.consume('CREATE_FACE', msg => response(channel, msg, controller.createFace))
    channel.consume('DELETE_FACE', msg => response(channel, msg, controller.deleteFace))
}
const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    if (!response) return;
    responseMessage(channel, msg, response);
}

const startServer = async () => {
    await db.connect();
    connectAmqserver()
}
startServer();

app.listen(port, () => {
    console.log('face service listen at port ' + port)
})
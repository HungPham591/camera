require('dotenv').config({ path: './.env.face-service' });
const app = require('./app');
const { createClient, responseMessage } = require('../../modules/rabbitmq.modules')
const controller = require('../../controllers/face.controller.js');

const port = process.env.PORT || 4006;
const amqserver = 'amqp://localhost:5672/'

const db = require("../../db");

db.connect();

createClient(amqserver).then(async channel => {
    await Promise.all([
        channel.assertQueue('GET_FACES'),
        channel.assertQueue('CREATE_FACE'),
        channel.assertQueue('DELETE_FACE')
    ])
    channel.consume('GET_FACES', msg => response(channel, msg, controller.getFaces))
    channel.consume('CREATE_FACE', msg => response(channel, msg, controller.createFace))
    channel.consume('DELETE_FACE', msg => response(channel, msg, controller.deleteFace))
});

const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    responseMessage(channel, msg, response);
}


app.listen(port, () => {
    console.log('face service listen at port ' + port)
})
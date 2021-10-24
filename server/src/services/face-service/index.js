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
        channel.assertQueue('GET_FACE'),
        channel.assertQueue('GET_FACES'),
        channel.assertQueue('CREATE_FACE'),
        channel.assertQueue('DELETE_FACE')
    ])
    channel.consume('GET_REPORT', msg => {
        response(channel, msg, controller.getReport);
    })
    channel.consume('GET_REPORTS', msg => {
        response(channel, msg, controller.getReports);
    })
    channel.consume('CREATE_REPORT', msg => {
        response(channel, msg, controller.createReport);
    })
    channel.consume('DELETE_REPORT', msg => {
        response(channel, msg, controller.deleteReport);
    })
});

const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    responseMessage(channel, msg, response);
}


app.listen(port, () => {
    console.log('report service listen at port ' + port)
})
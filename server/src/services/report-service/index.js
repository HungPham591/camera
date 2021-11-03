require('dotenv').config({ path: './.env.report-service' });
const app = require('./app');
const { createClient, responseMessage } = require('../../modules/rabbitmq.modules')
const controller = require('../../controllers/report.controller');

const port = process.env.PORT || 4003;
const amqserver = 'amqp://localhost:5672/'

const db = require("../../db");

db.connect();

createClient(amqserver).then(async channel => {
    await Promise.all([
        channel.assertQueue('GET_REPORT'),
        channel.assertQueue('GET_REPORTS'),
        channel.assertQueue('CREATE_REPORT'),
        channel.assertQueue('DELETE_REPORT')
    ])
    channel.consume('GET_REPORT', msg => response(channel, msg, controller.getReport))
    channel.consume('GET_REPORTS', msg => response(channel, msg, controller.getReports))
    channel.consume('CREATE_REPORT', msg => response(channel, msg, controller.createReport))
    channel.consume('DELETE_REPORT', msg => response(channel, msg, controller.deleteReport))
});

const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    responseMessage(channel, msg, response);
}


app.listen(port, () => {
    console.log('report service listen at port ' + port)
})
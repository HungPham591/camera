require('dotenv').config({ path: './.env.report-service' });
const app = require('./app');
const { createClient, responseMessage } = require('../../modules/rabbitmq.modules')
const controller = require('../../controllers/report.controller');

const port = process.env.PORT || 4003;
const amqserver = 'amqp://localhost:5672/'

const db = require("../../db");

const connectAmqserver = async () => {
    const channel = await createClient(amqserver);
    await Promise.all([
        channel.assertQueue('GET_REPORT'),
        channel.assertQueue('GET_REPORTS'),
        channel.assertQueue('CREATE_REPORT'),
        channel.assertQueue('DELETE_REPORT'),
        channel.assertQueue('DELETE_CAMERA'),
    ])
    channel.consume('GET_REPORT', msg => response(channel, msg, controller.getReport))
    channel.consume('GET_REPORTS', msg => response(channel, msg, controller.getReports))
    channel.consume('CREATE_REPORT', msg => response(channel, msg, controller.createReport))
    channel.consume('DELETE_REPORT', msg => response(channel, msg, controller.deleteReport))
    channel.consume('DELETE_CAMERA', msg => controller.deleteReportByCamera(JSON.parse(msg.content)))
}
const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    if (!response) return;
    responseMessage(channel, msg, response);
}

const startServer = async () => {
    await db.connect();
    connectAmqserver();
}
startServer();

app.listen(port, () => {
    console.log('report service listen at port ' + port)
})
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
    channel.consume('GET_REPORT', msg => {
        response(channel, msg, controller.getReport);
    })
    channel.consume('GET_REPORTS', msg => {
        response(channel, msg, controller.getReports);
    })
    channel.consume('CREATE_REPORT', msg => {
        console.log('new report');
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


//
// const WebSocketServer = require('ws').Server;
// const Events = require('../events/notification.event').eventBus;
// const jwt = require('jsonwebtoken');

// let listClient = [];
// const port = 15000;
// let ws = null;

// const start = () => {
//     createWSServer()
//     onClientConnect();
// }
// const createWSServer = () => {
//     ws = new WebSocketServer({ port: port });
// }
// const auth = (token) => {
//     try {
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         return decoded._id;
//     } catch (err) {
//         return false;
//     }
// }
// const onClientConnect = () => {
//     ws.on('connection', (ws, req) => {
//         let token = req.headers.cookie;
//         token = token.split('=')[1];
//         const id = auth(token);
//         if (!id) {
//             // ws.close();
//             // ws.destroy();
//             return;
//         }
//         const client = { id, ws };
//         console.log('new connection ' + id)
//         listClient.push(client);
//     });
// }



// const findClientToMessage = async (report) => {
//     const camera = await CameraModel.findById(report.camera);
//     const userId = camera.user.toString();
//     const ws = listClient.find(ws => ws.id === userId);
//     Message(ws, report);
// }
// const Message = (ws, data) => {
//     data = JSON.stringify(data);
//     ws.forEach(client => {
//         if (!client.ws.readyState) return;
//         client.ws.send(data)
//     });
// }
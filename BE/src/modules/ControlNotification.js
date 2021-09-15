const UserModel = require('../models/UserModel');
const CameraModel = require('../models/CameraModel');
const WebSocketServer = require('ws').Server;
const Events = require('../Events/Notification').eventBus;
const jwt = require('jsonwebtoken');

let listClient = [];
const port = 15000;
let ws = null;

const start = async () => {
    createWSServer()
    onClientConnect();
}
const createWSServer = () => {
    ws = new WebSocketServer({ port: port });
}
const auth = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decoded._id;
    } catch (err) {
        return false;
    }
}
const onClientConnect = () => {
    ws.on('connection', (ws, req) => {
        let token = req.headers.cookie;
        token = token.split('=')[1];
        const id = auth(token);
        if (!id) {
            // ws.close();
            // ws.destroy();
            return;
        }
        const client = { id, ws };
        console.log('new connection ' + id)
        listClient.push(client);
    });
}



const findClientToMessage = async (report) => {
    const camera = await CameraModel.findById(report.camera);
    const userId = camera.user.toString();
    const ws = listClient.find(ws => ws.id === userId);
    Message(ws, report);
}
const Message = (ws, data) => {
    data = JSON.stringify(data);
    ws.forEach(client => {
        if (!client.ws.readyState) return;
        client.ws.send(data)
    });
}
Events.on("NOTIFICATION", function (report) {
    findClientToMessage(report)
});

module.exports = { start };
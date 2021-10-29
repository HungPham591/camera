require('dotenv').config({ path: './.env.notification-service' });
const app = require('./app');
const { createClient } = require('../../modules/rabbitmq.modules');

const port = process.env.PORT || 4007;
const amqserver = 'amqp://localhost:5672/';

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: 'http://localhost:3000' });

const db = require("../../db");

db.connect();

createClient(amqserver).then(async channel => {
    await channel.assertQueue('CREATE_REPORT');
    channel.consume('CREATE_REPORT', msg => {
        const data = JSON.parse(msg.content);
        io.to(data.user).emit('notification', data);
    })
});

io.on('connection', function (socket) {
    //cho client ket noi vao room (dang nhap nhieu thiet bi)
    socket.on('join_room', function (msg) {
        //cho user join room
    })
})

server.listen(port, () => console.log('notification service listen at port ' + port));
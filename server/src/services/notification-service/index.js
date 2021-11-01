require('dotenv').config({ path: './.env.notification-service' });
const app = require('./app');
const { createClient } = require('../../modules/rabbitmq.modules');

const port = process.env.PORT || 4007;
const amqserver = 'amqp://localhost:5672/';

const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, { cors: 'http://localhost:3000' });

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
    socket.on('join', function (msg) {
        console.log('new user join room ' + JSON.stringify(msg))
        socket.join(msg);
    })
})

server.listen(port, () => console.log('notification service listen at port ' + port));
require('dotenv').config({ path: './.env.auth-service' });
const app = require('./app');
const { createClient, responseMessage } = require('../../modules/rabbitmq.modules.js')
const controller = require('../../controllers/user.controller');


const port = process.env.PORT || 4001;
const amqserver = 'amqp://localhost:5672/'

const db = require("../../db");

const connectAmqserver = async () => {
    const channel = await createClient(amqserver);
    await Promise.all([
        channel.assertQueue('SIGNIN'),
        channel.assertQueue('SIGNUP'),
        channel.assertQueue('GET_USER'),
        channel.assertQueue('UPDATE_USER'),
        channel.assertQueue('GET_USERS')
    ])
    channel.consume('SIGNIN', msg => response(channel, msg, controller.signIn))
    channel.consume('SIGNUP', msg => response(channel, msg, controller.signUp))
    channel.consume('GET_USER', msg => response(channel, msg, controller.getUser))
    channel.consume('UPDATE_USER', msg => response(channel, msg, controller.updateUser))
    channel.consume('GET_USERS', msg => response(channel, msg, controller.getUsers))
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
    console.log('auth service listen at port ' + port)
})

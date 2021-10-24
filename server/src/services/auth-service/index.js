require('dotenv').config({ path: './.env.auth-service' });
const app = require('./app');
const { createClient, responseMessage } = require('../../modules/rabbitmq.modules.js')
const controller = require('../../controllers/user.controller');


const port = process.env.PORT || 4001;
const amqserver = 'amqp://localhost:5672/'

const db = require("../../db");


db.connect();

createClient(amqserver).then(async channel => {
    await Promise.all([
        channel.assertQueue('SIGNIN'),
        channel.assertQueue('SIGNUP'),
        channel.assertQueue('GET_USER'),
        channel.assertQueue('GET_USERS')
    ])
    channel.consume('SIGNIN', msg => {
        response(channel, msg, controller.signIn);
    })
    channel.consume('SIGNUP', msg => {
        response(channel, msg, controller.signUp);
    })
    channel.consume('GET_USER', msg => {
        response(channel, msg, controller.getUser);
    })
    channel.consume('GET_USERS', msg => {
        response(channel, msg, controller.getUsers);
    })
});

const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    responseMessage(channel, msg, response);
}


app.listen(port, () => {
    console.log('auth service listen at port ' + port)
})

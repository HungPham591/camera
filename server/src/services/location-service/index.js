require('dotenv').config({ path: './.env.location-service' });
const app = require('./app');
const { createClient, responseMessage } = require('../../modules/rabbitmq.modules')
const controller = require('../../controllers/location.controller.js');

const port = process.env.PORT || 4007;
const amqserver = 'amqp://localhost:5672/'

const db = require("../../db");

db.connect();

createClient(amqserver).then(async channel => {
    await Promise.all([
        channel.assertQueue('GET_LOCATIONS'),
        channel.assertQueue('GET_LOCATION'),
        channel.assertQueue('CREATE_LOCATION'),
        channel.assertQueue('DELETE_LOCATION')
    ])
    channel.consume('GET_LOCATION', msg => response(channel, msg, controller.getLocation))
    channel.consume('GET_LOCATIONS', msg => response(channel, msg, controller.getLocations))
    channel.consume('CREATE_LOCATION', msg => response(channel, msg, controller.createLocation))
    channel.consume('DELETE_LOCATION', msg => response(channel, msg, controller.deleteLocation))
});

const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    responseMessage(channel, msg, response);
}


app.listen(port, () => {
    console.log('location service listen at port ' + port)
})
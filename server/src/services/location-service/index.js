require('dotenv').config({ path: './.env.location-service' });
const app = require('./app');
const { createClient, responseMessage } = require('../../modules/rabbitmq.modules')
const controller = require('../../controllers/location.controller.js');
const Event = require('../../events/camera.event').eventBus;
const fs = require('fs');
const path = require("path");

const port = process.env.PORT || 4008;
const amqserver = 'amqp://localhost:5672/'

const db = require("../../db");


const connectAmqserver = async () => {
    const channel = await createClient(amqserver);
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
}
const response = async (channel, msg, controller) => {
    const data = JSON.parse(msg.content);
    const response = await controller(data);
    if (!response) return responseMessage(channel, msg, null);
    responseMessage(channel, msg, response);
}

const startServer = async () => {
    await db.connect();
    connectAmqserver();
}
startServer();

Event.on("DELETE_LOCATION", function (doc) {
    const dataPath = path.join(__dirname, '..', '..', "public", doc?.user, "map", doc?._id + ".jpg");
    fs.unlink(dataPath, err => console.log(err))
});

app.listen(port, () => {
    console.log('location service listen at port ' + port)
})
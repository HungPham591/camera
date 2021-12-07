const amqp = require('amqplib');
const { time } = require('console');
const EventEmitter = require('events');
const uuid = require('uuid');

const REPLY_QUEUE = 'amq.rabbitmq.reply-to';

exports.createClient = rabbitmqconn => {
    return amqp
        .connect(rabbitmqconn)
        .then(conn => conn.createChannel())
        .then(channel => {
            channel.responseEmitter = new EventEmitter();
            channel.responseEmitter.setMaxListeners(0);
            channel.consume(
                REPLY_QUEUE,
                msg => {
                    channel.responseEmitter.emit(
                        msg.properties.correlationId,
                        JSON.parse(msg.content)
                    );
                },
                { noAck: true },
            );
            return channel;
        });
}
exports.sendMessage = (channel, message, queue) => {
    console.log(queue + ' ' + new Date());
    message = JSON.stringify(message);
    channel.sendToQueue(queue, Buffer.from(message));
}
exports.sendRPCMessage = (channel, message, rpcQueue) => {
    console.log(rpcQueue + ' ' + new Date());
    message = JSON.stringify(message);
    return new Promise(resolve => {
        const correlationId = uuid.v4();
        channel.responseEmitter.once(correlationId, resolve);
        channel.sendToQueue(rpcQueue, Buffer.from(message), {
            correlationId,
            replyTo: REPLY_QUEUE,
        });
        setTimeout(() => {
            resolve(null)
        }, 1000);
    });
}
exports.responseMessage = (channel, oldMessage, message) => {
    message = JSON.stringify(message);
    const correlationId = oldMessage.properties.correlationId;
    const queue = oldMessage.properties.replyTo;
    channel.sendToQueue(queue, Buffer.from(message), { correlationId: correlationId });
    channel.ack(oldMessage);
}
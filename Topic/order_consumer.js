import amqplib from "amqplib";

const orderNotification = async () => {
    try {
        const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel()
    const exchange = "notification_exchange";
    const queue = "order_queue";

    await channel.assertExchange(exchange, 'topic', {durable: true})
    await channel.assertQueue("order_queue", {durable: true})
    await channel.bindQueue("order_queue", exchange, 'order.*');

    channel.consume(queue, (message) => {

        if (message !== null){
            console.log('order message', message.content.toString());
            channel.ack(message)
        }

    }, {noAck: false})
        
    } catch (error) {
        console.log(error)
    }
    
}

orderNotification()
import amqplib from "amqplib";

const paymentNotification = async () => {
    try {
        const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel()
    const exchange = "notification_exchange";
    const queue = "payment_queue";

    await channel.assertExchange(exchange, 'topic', {durable: true})
    await channel.assertQueue("payment_queue", {durable: true})
    await channel.bindQueue("payment_queue", exchange, "payment.#");

    channel.consume(queue, (message) => {

        if (message !== null){
            console.log('payment message', message.content.toString());
            channel.ack(message)
        }

    }, {noAck: false})
        
    } catch (error) {
        console.log(error)
    }
    
}

paymentNotification()
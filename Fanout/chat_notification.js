import amqplib from "amqplib";

const chatNotification = async () => {
    try {

        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createConfirmChannel()
        const exchange = "newProductNotification";

        await channel.assertExchange(exchange, "fanout", { durable: true })
        const queue = await channel.assertQueue("", { exclusive: true })
        await channel.bindQueue(queue.queue, exchange, "");

        channel.consume(queue.queue, (message) => {
            if (message !== null) {
                console.log("messge chat notification", message.content.toString());
                channel.ack(message);
            }
        })

    } catch (error) {
        console.log(error)
    }
}

chatNotification();

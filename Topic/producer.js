import amqplib from "amqplib";

const sendNotification = async (routingKey, message) => {
    const connection = await amqplib.connect("amqp://localhost")
    const channel = await connection.createConfirmChannel()

    const exchange = "notification_exchange";

    channel.assertExchange(exchange, "topic", { durable: true })

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), { persistent: true })

    console.log(`Producer data --- ${routingKey} - ${Buffer.from(JSON.stringify(message))}`)

    await channel.waitForConfirms() // guarantee broker received it
    await channel.close();
    await connection.close();


}

sendNotification("order.placed", { orderId: 132, status: "ajay" })
sendNotification("payment.completed", { orderId: 143, status: "Shubh" })

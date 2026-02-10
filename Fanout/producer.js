import amqplib from "amqplib";

const announceNewProduct = async (message) => {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createConfirmChannel();
        const exchange = "newProductNotification";

        console.log("channel created")
        await channel.assertExchange(exchange, "fanout", { durable: true })
        await channel.publish(exchange, "", Buffer.from(JSON.stringify(message)), { persistent: true })

        await channel.waitForConfirms()
        channel.close()
        connection.close()

    } catch (error) {
        console.log(error)
    }

}

announceNewProduct({name: "iPhone 17", price: "100000"})
announceNewProduct({name: "iPhone 17 pro", price: "120000"})


const amqp = require("amqplib");

async function receivedMail() {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        await channel.assertQueue("mail_queue", {durable: false})
        channel.consume("mail_queue", (message) => {

            if (message !== null ){
                const data = message.content.toString()
                console.log("message", JSON.parse(data))
                channel.ack(message)

            }
            
        })
    }catch(error){
        console.log(error)
    }
}

receivedMail();

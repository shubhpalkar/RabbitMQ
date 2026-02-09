const amqp = require("amqplib");

async function sendMail() {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();
        const exchange = "mail_exchange";

        const routingKeyMail = "send_mail";
        const routingKeySMS = "send_sms";

        const message = {
            to: "shubh11@gmail.com",
            from: "shubhpalkar11@gmail.com",
            subject: "Tell mail Akash",
            body: "Hello name"
        }

        //create Exchange
        channel.assertExchange(exchange, "direct", {durable: false})

        //assert queues
        channel.assertQueue("mail_queue", {durable: false})
        channel.assertQueue("sms_queue", {durable: false})

        //bind queues
        channel.bindQueue("mail_queue", exchange, routingKeyMail)
        channel.bindQueue("sms_queue", exchange, routingKeySMS)
        console.log("data", message.subject.includes("sms"))

        if (message.subject.includes("sms")){
            channel.publish(exchange, routingKeySMS, Buffer.from(JSON.stringify(message)))
        }else {
            channel.publish(exchange, routingKeyMail, Buffer.from(JSON.stringify(message)))
        }
        
        console.log("data send", message)
        
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.log(error)
    }
}

sendMail();

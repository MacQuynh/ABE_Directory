const amqp = require("amqplib");

const msg = {number:19}

async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel();
        const result = await channel.assertQueue ("jobs");
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`Sucess ${msg.number}`);
    }
    catch (ex) {
        console.error("You fucked up! ", ex)
    }
}
const amqp = require("amqplib");

async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel();
        const result = await channel.assertQueue ("jobs");
        debugger
        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved jobs: ${input}`);
        })

        console.log("Waiting for msg...")
    }
    catch (ex) {
        console.error("You fucked up! ", ex)
    }
}
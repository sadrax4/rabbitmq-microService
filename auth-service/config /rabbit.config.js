const amqp = require("amqplib");
const connectToChannel = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        return (await connection.createChannel());
    } catch (error) {
        console.log("can not connect to rabbitmq server");
    }
}
const returnChannel = async (channel) => {
    if (!channel) {
        channel = await connectToChannel();
    }
    return channel;
}
const createQueue = async (queueName) => {
    try {
        const channel = await returnChannel();
        await channel.assertQueue(queueName);
        return channel;
    } catch (error) {
        console.log(error.message)
    }
}
const pushToQueue = async (queueName, data) => {
    try {
        await channel.assertQueue(queueName);
        await sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log(error.message);
    }
}
const createOrderWithQueue = async (queueName) => {
    const channel = await createQueue(queueName);
    channel.consume(queueName, async msg => {
        if (msg.content) {
            const { email, products } = JSON.parse(msg.content.toString());
            const newOrder = await orderModel.create({
                email,
                products,
                totalPrice: (products.map(p => +p.price)).reduce((prev, curr) => prev + curr, 0)
            })
            await pushToQueue("PRODUCT", newOrder);
        }
    })
}
module.exports = {
    connectToChannel,
    returnChannel,
    pushToQueue,
    createQueue,
    createOrderWithQueue
}
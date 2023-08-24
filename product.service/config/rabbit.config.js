const amqp = require("amqplib");
let channel;
const connectToChannel = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        return (await connection.createChannel());
    } catch (error) {
        console.log("can not connect to rabbitmq server");
    }
}
const returnChannel = async () => {
    if (!channel) {
        channel = await connectToChannel();
    }
    return channel;
}
const createQueue = async (queueName) => {
    try {
        const productChannel = await returnChannel();
        await productChannel.assertQueue(queueName);
        return productChannel;
    } catch (error) {
        console.log(error)
    }
}
const pushToQueue = async (queueName, data) => {
    try {
        const channel = await returnChannel();
        await channel.assertQueue(queueName);
        await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log(error);
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
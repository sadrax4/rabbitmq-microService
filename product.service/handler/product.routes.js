const { authenticate } = require("../../isAuthenticate");
const { pushToQueue, createQueue } = require("../config/rabbit.config");
const { productModel } = require("../model/productModel");
const router = require("express").Router();
router.post("/create", async (req, res, next) => {
    const { name, desc, price } = req.body;
    await productModel.create({ name, desc, price });
    return res.json({ message: "product created" });
})
router.post("/buy", authenticate, async (req, res, next) => {
    try {
        const { products: productIds = [] } = req.body;
        const products = await productModel.find({ _id: { $in: productIds } });
        const orderQueue = 'ORDER';
        const  email  = req.user;
        await pushToQueue(orderQueue, { email, products });
        const channel = await createQueue("PRODUCT");
        channel.consume("PRODUCT", msg => {
            console.log(JSON.parse(msg.content.toString()));
        })
        return res.json({ message: "order is created" });
    } catch (error) {
        next(error.message);
    }
})
module.exports = {
    productRouter: router
}
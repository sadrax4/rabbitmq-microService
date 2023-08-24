const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    products: [{ _id: String }],
    email: { type: String, required: true },
    totalPrice: { type: String, required: true }
})

const orderModel = mongoose.model("order", orderSchema);
module.exports = { orderModel }
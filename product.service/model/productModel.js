const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: "string", required: true },
    desc: { type: "string", required: true },
    price: { type: "string", required: true }
})

const productModel = mongoose.model("product", productSchema);
module.exports = { productModel }
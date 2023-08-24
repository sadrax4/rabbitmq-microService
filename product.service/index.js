const express = require("express");
const { productRouter } = require("./handler/product.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
require("./model/initMongo");
app.use("/product", productRouter);
app.listen(4001, () => {
    console.log("server run from product on port 4001");
})
app.use((req, res, next) => {
    return res.json({ notFound: "404" });
})
app.use((error, req, res, next) => {
    return res.json({ error: error.message })
})
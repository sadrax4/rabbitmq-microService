const express = require("express");
const { authRouter } = require("./handler/auth.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use("/auth", authRouter);
require("./model/initMongo");
app.listen(4000, () => {
    console.log("server on 4000");
})
app.use((req, res, next) => {
    return res.json({ notFound: "404" });
})

app.use((error, req, res, next) => {
    return res.json({ error: error.message })
})
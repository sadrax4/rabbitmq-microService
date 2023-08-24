const { default: mongoose } = require("mongoose");
(async function () {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("connected to mongodb from order")
})();
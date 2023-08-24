const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: "string", required: true },
    number: { type: "string", required: true },
    password: { type: "string", required: true }
})

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel }
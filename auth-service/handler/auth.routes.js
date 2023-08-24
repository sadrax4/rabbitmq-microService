const { UserModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
router.post('/register', async (req, res, next) => {
    try {
        const { number, email, password } = req.body;
        userExists(number, email);
        await UserModel.create({ number, email, password });
        return res.json({ message: "user created" })
    } catch (error) {
        next(error);
    }
})
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user.password != password) throw new Error("password incorrect" );
        jwt.sign(email, "secret", (err, token) => {
            if (err) throw { error: err };
            return res.json({ token })
        })
    } catch (error) {
        next(error);
    }
})
async function userExists(number, email) {
    const findResultByEmail = await UserModel.findOne({ email })
    if (findResultByEmail) throw { error: "user already exists with that email" };
    const findResultByNumber = await UserModel.findOne({ number })
    if (findResultByNumber) throw { error: "user already exists with that number" };
}
module.exports = {
    authRouter: router
}
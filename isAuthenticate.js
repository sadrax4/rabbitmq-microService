const jwt = require("jsonwebtoken");
const authenticate = async function (req, res, next) {
    try {
        const token = req.headers?.["authorization"]?.split(" ")[1];
        if (!token) throw ("not authorized");
        jwt.verify(token, "secret", (err, payload) => {
            if (err) throw (err.message);
            req.user = payload;
        })
        next();
    } catch (error) {
        next(error.message);
    }
}
module.exports = {
    authenticate
}
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

exports.generateToken = (id, res) => {
    const token = jwt.sign({ id: id.toString() }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    const option = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.cookie("token", token, option)
    return token
}
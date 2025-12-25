const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const dotenv = require("dotenv")
dotenv.config()

exports.isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({ success: false, message: "User is not Authenticated" })
        }
        
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = await User.findById(decode.id).select("-password")

        if (!req.user) {
            return res.status(401).json({ success: false, message: "User not found" })
        }
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: "User Authentication error", error: error.message })
    }
}
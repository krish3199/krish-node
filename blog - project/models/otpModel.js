const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    otp: {
        type: String,
        required: [true, "OTP is required"],
    },
    expireAt: {
        type: Date,
        required: true,
    }
}, { timestamps: true })
module.exports = mongoose.model("OTP", otpSchema)
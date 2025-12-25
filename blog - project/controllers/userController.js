const User = require("../models/userModel")
const OTP = require("../models/otpModel")
const bcryptjs = require("bcryptjs")
const { generateToken } = require("../utils/generateToken")
const { sendEmail } = require("../utils/sendEmail")

exports.handleRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are require" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already register" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const userData = await User.create({
            name,
            email,
            password: hashedPassword
        })

        userData.password = undefined

        res.status(201).json({ message: "Registration Successfull", userData })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Restration error", error: error.message })
    }
}

exports.handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "email and password are require" })
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Invalid Password" })
        }

        generateToken(user._id, res)

        user.password = undefined

        res.status(200).json({ message: "Successfully Login", user })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Login error", error: error.message })
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ success: false, message: "email are require" })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const hashedOTP = await bcryptjs.hash(otp, 10)

        await OTP.findOneAndUpdate(
            { email },
            {
                email,
                otp: hashedOTP,
                expireAt: Date.now() + 10 * 60 * 1000
            },
            { upsert: true }
        )

        await sendEmail(email, "Your OTP is", otp)

        res.status(200).json({ success: true, message: "Your OTP sent your email" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Forgot Password error", error: error.message })
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        const { otp, email } = req.body
        if (!otp) {
            return res.status(400).json({ success: false, message: "OTP are require" })
        }

        const otpData = await OTP.findOne({
            email,
            expireAt: { $gt: Date.now() },
        });
        if (!otpData) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        const isOTP = await bcryptjs.compare(otp.toString(), otpData.otp)
        if (!isOTP) {
            return res.status(401).json({ success: false, message: "Invalid OTP" })
        }

        await OTP.findOneAndDelete({ email: otpData.email });

        res.status(200).json({ success: true, message: "OTP verified Successfully", email: otpData.email })
    } catch (error) {
        return res.status(500).json({ success: false, message: "OTP verify error", error: error.message })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: "All fields are require" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: "New and Confirm Password do not match" })
        }

        const hashedNewPassword = await bcryptjs.hash(newPassword, 10)

        const user = await User.findOneAndUpdate(
            { email },
            { password: hashedNewPassword },
            { new: true }
        )

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        res.status(200).json({ success: true, message: "Password reset Successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Password Reset error", error: error.message })
    }
}
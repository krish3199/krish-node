const nodemailer = require("nodemailer");
const dotenv = require("dotenv")

dotenv.config()
exports.sendOtp = async (option) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.OTP_USER,
            pass: process.env.OTP_PASS,
        },
    });

    const mail = {
        from: process.env.OTP_USER,
        to: option.email,
        subject: option.subject,
        text:option.message, 
    }
    await transporter.sendMail(mail)
}
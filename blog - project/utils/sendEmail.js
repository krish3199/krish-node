const nodemailer = require("nodemailer");

exports.sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject,
      text: message
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    res.status(500).json({ message: "OTP generate error", error: error.message })
  }
}
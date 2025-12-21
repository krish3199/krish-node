const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: "Hotel Booking App",
    to: email,
    subject: "Password Reset OTP",
    html: `<h2>Your OTP is: ${otp}</h2>`
  });
};

module.exports = sendEmail;

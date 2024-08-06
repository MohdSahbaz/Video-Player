const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOTP = (email, otp) => {
  const mailOption = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code to Reset SolKer User Password",
    text: `OTP code is ${otp}`,
  };
  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendOTP;

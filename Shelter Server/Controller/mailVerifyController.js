const nodemailer = require("nodemailer");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();
let otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtp = (req, res) => {
  const { email } = req.body;

  const otp = crypto.randomInt(100000, 999999).toString();

  otpStore[email] = {
    otp,
    expiry: Date.now() + 10 * 60 * 1000,
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ msg: "Failed to send OTP", error });
    }
    res.status(200).json({ msg: "OTP sent successfully!" });
  });
};

const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email]) {
    const storedOtp = otpStore[email].otp;
    const expiryTime = otpStore[email].expiry;

    if (Date.now() > expiryTime) {
      delete otpStore[email];
      return res.status(400).json({ msg: "OTP expired, please request a new one." });
    }

    if (otp === storedOtp) {
      delete otpStore[email];
      return res.status(200).json({ msg: "OTP verified successfully!" });
    } else {
      return res.status(400).json({ msg: "Invalid OTP. Please try again." });
    }
  } else {
    return res.status(400).json({ msg: "OTP not found. Please request a new one." });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
};

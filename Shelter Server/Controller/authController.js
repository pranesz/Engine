const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

exports.register = async (req, res) => {
  console.log('register');
  console.log(req.body);
  console.log(req.file);

  const { username, email, password, phoneNumber, age, gender, about } = req.body;
  const profileImage = req.file ? req.file.path : null;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({
      username,
      email,
      password,
      profileImage,
      phoneNumber,
      age,
      gender,
      about
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;

        res.json({ token, msg: "Login successful!", id: user.id });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.validateToken = (req, res) => {
  console.log("checkTOken");
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ valid: false, message: 'Token is missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Token is invalid or expired' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
    // console.log(user);

  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('File:', req.file);
    console.log('User ID:', req.userId);

    const { username, email, phoneNumber, age, gender, about } = req.body;
    const updatedData = { username, email, phoneNumber, age, gender, about };

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    if (user.profileImage && req.file) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', path.basename(user.profileImage));
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error('Error deleting old image:', err);
      });
    }

    if (req.file) {
      updatedData.profileImage = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, updatedData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

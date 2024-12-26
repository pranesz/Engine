// const Register = require('../models/register');
// const path =require('path')
// const registerUser = async (req, res) => {
//   const { email, phone } = req.body;

//   try {
//     // Check if required fields are provided
//     if (!email || !phone) {
//       return res.status(400).json({ message: 'Email and phone are required.' });
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: 'Invalid email format.' });
//     }

//     // Check if the email already exists in the database
//     const existingUser = await Register.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: 'Email is already registered.' });
//     }

//     // Create and save the new user
//     const newUser = new Register({ email, phone });
//     await newUser.save();

//     // Respond with success
//     res.status(201).json({ message: 'User registered successfully.', user: { email, phone } });
//   } catch (error) {
//     console.error('Error while registering user:', error.message);

//     // Handle MongoDB validation errors
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ message: error.message });
//     }

//     // Generic server error
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// };

// module.exports = { registerUser };







const Register = require('../models/register');

exports.registerUser = async (req, res) => {
  const { email, phone } = req.body;

  try {
    // Check if user already exists
    let user = await Register.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Save new user
    user = new Register({ email, phone });
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

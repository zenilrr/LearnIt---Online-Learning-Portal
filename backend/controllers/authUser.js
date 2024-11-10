// auth.js

const User = require('../models/user');
const Profile = require('../models/profile');
const bcrypt = require('bcrypt');
const generateToken = require('../middleware/generateToken');


const authUser = async (req, res) => {

  const { email, password } = req.body;

  try {
    // Check if user exists based on email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Please check your email or register.',
      });
    }

    // Compare provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. Please try again.',
      });
    }

    // Successful login, send back a success response (you could also add JWT here)
    res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: { email: user.email, firstName: user.firstName ,lastName: user.lastName , accountType:user.accountType,token:generateToken(user._id)}, // Optional: Send back user details
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login. Please try again later.',
    });
  }
};




module.exports = authUser; // Export directly as a function

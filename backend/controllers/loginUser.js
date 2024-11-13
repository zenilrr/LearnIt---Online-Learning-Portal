const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  // Find the user by email
  const checkUser = await User.findOne({ userEmail });

  // Check if the user exists and the password is correct
  if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Retrieve role from the user data in the database
  const userRole = checkUser.role;

  // Generate a JWT including the role for further use in protected routes
  const accessToken = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: userRole, // Include role in token for role-based access control
    },
    process.env.JWT_SECRET,
    { expiresIn: "120m" }
  );

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: userRole, // Return the role to the client if needed
      },
    },
  });
};

module.exports = loginUser;

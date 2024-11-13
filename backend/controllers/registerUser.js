const User = require("../models/User");
const bcrypt = require("bcryptjs");


const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;

  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (existingUser) {
    if (existingUser.userEmail === userEmail) {
      
      return res.status(400).json({ message: "Email is already registered" });
    } else if (existingUser.userName === userName) {
     
      return res.status(400).json({ message: "Username is already taken" });
    }
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    userEmail,
    role,
    password: hashPassword,
  });

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully!",
  });
};

module.exports = registerUser;

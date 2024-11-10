

const User = require('../models/user');
// const Profile = require('../models/profile');
const bcrypt = require('bcrypt');
const registerUser = async (req, res) => {
console.log("reached Register")
    try {
        // Extracting user details from request body
        const { firstName, lastName, email, password, accountType } = req.body;
        console.log(req.body)
        // Basic validation
        if (!firstName || !lastName || !email || !password || !accountType) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields',
            });
        }

        // Validate matching passwords
      
        // Check if user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists. Please login.',
            });
        }

        // Encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // // Create a new profile entry
        // const profileData = await Profile.create({
        //     gender: null,
        //     dateOfBirth: null,
        //     about: null,
        //     contactNumber: null,
        // });

        // Determine approval status based on account type
        const isApproved = accountType === "Instructor" ? false : true;
        const avatarUrl = ``;

        // Create new user in database
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword,
            accountType,
        });

        // Return success message
        res.status(201).json({
            success: true,
            message: 'Registration successful. Welcome aboard!',
        });
    } catch (error) {
        // Log error and return failure response
        console.error('Error during user registration:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during registration. Please try again later.',
            error: error.message,
        });
    }
};

module.exports  = registerUser;

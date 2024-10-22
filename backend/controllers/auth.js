// Import necessary modules
const User = require('../models/user');
const Profile = require('../models/profile');
const bcrypt = require('bcrypt');

// ================ USER SIGNUP HANDLER ================
exports.signup = async (req, res) => {
    try {
        // Extract user details from the request body
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber } = req.body;

        // Basic validation to ensure all required fields are provided
        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        // Validate that the passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match. Please try again.'
            });
        }

        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists. Please login.'
            });
        }

        // Encrypt the password for secure storage
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create a new profile entry with default values
        const profileData = await Profile.create({
            gender: null, 
            dateOfBirth: null, 
            about: null, 
            contactNumber: null
        });

        // Set approval status based on account type
        const isApproved = accountType === "Instructor" ? false : true;
        const avatarUrl = ``;
        // Create the user in the database
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword,
            contactNumber,
            accountType,
            additionalDetails: profileData._id,
            approved: isApproved,
            image: avatarUrl
        });

        // Respond with a success message
        res.status(201).json({
            success: true,
            message: 'Registration successful. Welcome aboard!'
        });
    } catch (error) {
        // Log the error and return a generic failure response
        console.error('Signup process encountered an error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during registration. Please try again later.',
            error: error.message
        });
    }
};

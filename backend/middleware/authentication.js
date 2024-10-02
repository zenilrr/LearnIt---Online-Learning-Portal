//token based authentication
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Token checking middleware
exports.auth = (req, res, next) => {
    try {
        // Authorization header
        const token = req.body?.token || req.cookies?.token || req.header('Authorization')?.split(' ')[1];

       
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access Denied: No token provided'
            });
        }

     
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err.message);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token, authorization denied',
                    error: err.message
                });
            }
            req.user = decoded;  
            next(); 
        });

    } catch (error) {
        console.error('Unexpected error during token validation:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error during token validation',
            error: error.message
        });
    }
};


//authentication for student

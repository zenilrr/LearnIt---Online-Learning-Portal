const express = require('express');
const router = express.Router();
const {getCourseById} = require('../../controllers/student-controller/coursePage'); // Ensure the path is correct

// Route for getting course details by ID
router.get('/course', getCourseById);

// Export the router 
module.exports = router;
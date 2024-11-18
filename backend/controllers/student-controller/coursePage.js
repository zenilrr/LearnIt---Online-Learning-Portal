const Course = require('../../models/Course'); // Ensure the path is correct

// Get course details by ID
const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id || req.query.id; // Capture course ID from URL parameter
    const course = await Course.findById(courseId);

    console.log(courseId)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching course',
    });
  }
};

// Add more controller functions as needed
module.exports = {
  getCourseById
};
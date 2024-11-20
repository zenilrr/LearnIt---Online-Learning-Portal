const express = require("express");
const getCourseDetails = require("../../controllers/student-controller/course-controller");
const router = express.Router();

router.route('/:id').get(getCourseDetails.getStudentViewCourseDetails);

module.exports = router;

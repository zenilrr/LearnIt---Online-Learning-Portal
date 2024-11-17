const mongoose = require("mongoose");

const CourseDetailsSchema = new mongoose.Schema({
    ytsrc: String,
    instructorName: String,
    StudentsEnrolled: Number,
    Chapters: Number,
    Quizzes: Number,
    Access: String,
    Exeptise: String,
    StudentsTaught: Number,
    TotalCourseOffered: Number,
    title: String,
    Reviews: String,
    primaryLanguage: String,
    
    description: String,
    Rating: Number,
    
    
  });
  
  module.exports = mongoose.model("coursedetail", CourseDetailsSchema,); 
  
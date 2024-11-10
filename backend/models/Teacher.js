// models/Teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  biodata: { type: String, required: true },
  education: { type: String, required: true },
  experience: { type: String, default: null },
  skills: { type: String, required: true },
  subject: { type: String, required: true },
  qualifications: { type: String, required: true },
  courses_taught: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const Teacher = mongoose.model('Teacher', teacherSchema); // Capitalized model name
module.exports = Teacher;

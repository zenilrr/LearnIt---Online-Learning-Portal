// models/Lesson.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  description : {type: String, required: true},
  thumbnailFile: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);

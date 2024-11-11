const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  course_name: { type: String, required: true },
  description: {
    chapters: { type: String, required: true },
    small_description: { type: String, required: true },
    large_description: { type: String, required: true },
    language: { type: String, required: true },
    topic: { type: String, required: true },
    isFree: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    requirements: { type: String, required: true },
    what_will_you_learn: { type: String, required: true },
    level: { type: String, required: true }
  },
  instructor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
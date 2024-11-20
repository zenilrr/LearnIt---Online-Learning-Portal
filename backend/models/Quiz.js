const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  passingScore: {
    type: Number,
    required: true,
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [
        {
          type: String, 
          required: true
        }
      ],
      correctAnswer: { type: Number, required: true }, // Index of correct answer
    },
  ],
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;

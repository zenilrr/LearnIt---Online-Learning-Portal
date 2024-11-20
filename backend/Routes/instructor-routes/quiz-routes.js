const express = require('express');
const router = express.Router();
const { addQuiz } = require('../../controllers/Instructor/quiz-controller'); // Import the addQuiz controller function

// Route to add a quiz
router.post('/', addQuiz);

module.exports = router;

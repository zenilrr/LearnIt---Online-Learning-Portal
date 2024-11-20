const Quiz = require('../../models/Quiz'); // Adjust the path based on your project structure

// Controller function to add a quiz
const addQuiz = async (req, res) => {
  const { passingScore, questions } = req.body;

  // Validate input
  if (!passingScore || !questions || !Array.isArray(questions)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    // Create and save the quiz
    const newQuiz = new Quiz({ passingScore, questions });
    await newQuiz.save();

    res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (error) {
    console.error('Error saving quiz:', error);
    res.status(500).json({ message: 'Failed to create quiz' });
  }
};

module.exports = {
  addQuiz,
};

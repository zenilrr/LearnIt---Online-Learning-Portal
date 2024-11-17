import React, { useState, useEffect } from 'react';
import './Styles/CoursePage.css';
import { ExpandMore, ArrowBack, ArrowForward } from '@mui/icons-material';
import { Collapse, Pagination, IconButton } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function CoursePage({ courseData }) {
  const [modules, setModules] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [openModules, setOpenModules] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [quizPage, setQuizPage] = useState(1);
  const [showQuizFinalResults, setShowQuizFinalResults] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const { state } = useLocation();

  // Fetch or set course data dynamically
  useEffect(() => {
    if (courseData) {
      setModules(courseData);
    } else {
      axios.get(`http://localhost:8000/apix/course?id=${state}`)
        .then(response => setModules(response.data.data.curriculum))
        .catch(error => console.error('Error fetching course data:', error));
    }
  }, [courseData]);

  // If modules data hasn't loaded yet, show a loading state
  if (!modules.length) {
    return <div>Loading...</div>;
  }

  const totalLessons = modules.reduce((acc, module) => acc + module.items.length, 0);
  const progressPercentage = Math.round((completedLessons.length / totalLessons) * 100);
  const currentLesson = modules[currentModuleIndex]?.items[currentLessonIndex];

  const markAsComplete = () => {
    const lessonKey = `${currentModuleIndex}-${currentLessonIndex}`;
    if (!completedLessons.includes(lessonKey)) {
      setCompletedLessons([...completedLessons, lessonKey]);
    }
  };

  const navigateNext = () => {
    if (currentLessonIndex < modules[currentModuleIndex].items.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentLessonIndex(0);
    }
  };

  const navigatePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentLessonIndex(modules[currentModuleIndex - 1].items.length - 1);
    }
  };

  const handleLessonClick = (moduleIndex, lessonIndex) => {
    setCurrentModuleIndex(moduleIndex);
    setCurrentLessonIndex(lessonIndex);
    setQuizPage(1);
    setShowQuizFinalResults(false);
    setShowAnswers(false);
    setShowInstructions(true);
  };

  const toggleModule = (index) => {
    setOpenModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleQuizAnswer = (questionIndex, optionIndex) => {
    const lessonTitle = currentLesson.title;
    setQuizAnswers((prev) => ({
      ...prev,
      [lessonTitle]: {
        ...prev[lessonTitle],
        [questionIndex]: optionIndex,
      },
    }));
  };

  const calculateQuizResults = () => {
    const quiz = currentLesson.quiz;
    const answers = quizAnswers[currentLesson.title] || {};
    const correctAnswersCount = quiz.questions.filter(
      (q, i) => answers[i] === q.correctAnswer
    ).length;

    setQuizResults(correctAnswersCount);
    setShowQuizFinalResults(true);
    setShowAnswers(true);

    if (correctAnswersCount >= quiz.passingMarks) {
      markAsComplete();
    }
  };

  const handleQuizPageChange = (event, value) => {
    setQuizPage(value);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizResults(null);
    setQuizPage(1);
    setShowQuizFinalResults(false);
    setShowAnswers(false);
    setShowInstructions(true);
  };

  const isLastLesson =
    currentModuleIndex === modules.length - 1 &&
    currentLessonIndex === modules[modules.length - 1].items.length - 1;
  const isFirstLesson = currentModuleIndex === 0 && currentLessonIndex === 0;

  const renderQuizResponses = () => {
    if (!showAnswers) return null;

    const correctAnswers = quizResults;
    const totalQuestions = currentLesson.quiz.questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;

    return (
      <div className="quiz-answer">
        <div className="progress-circle">
          <CircularProgressbar
            value={percentage}
            text={`${quizResults}/${totalQuestions}`}
            styles={buildStyles({
              pathColor: percentage >= 80 ? 'green' : 'red',
              textColor: percentage >= 80 ? 'green' : 'red',
            })}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="course-page">
      <div className="course-header">
        <div className="back-button" onClick={() => window.history.back()}>
          <ArrowBack />
        </div>
        <div className="header-title">Introduction LearnPress – LMS Plugin</div>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      <div className="course-container">
        <div className="course-sidebar">
          <h2>Curriculum</h2>
          {modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="module">
              <h3 onClick={() => toggleModule(moduleIndex)}>
                {module.title}
                <ExpandMore
                  className="dropdown-icon"
                  style={{
                    transform: openModules.includes(moduleIndex) ? 'rotate(180deg)' : '',
                  }}
                />
              </h3>
              <Collapse in={openModules.includes(moduleIndex)}>
                <ul>
                  {module.items.map((lesson, lessonIndex) => {
                    const lessonKey = `${moduleIndex}-${lessonIndex}`;
                    return (
                      <li
                        key={lessonIndex}
                        className={`lesson ${completedLessons.includes(lessonKey) ? 'completed' : ''}`}
                        onClick={() => handleLessonClick(moduleIndex, lessonIndex)}
                      >
                        <span>{lesson.title}</span>
                        {lesson.type === 'video' && (
                          <IconButton
                            color="primary"
                            onClick={() => window.open(`/download-pdf/${moduleIndex}`, '_blank')}
                            title="Download PDF"
                            size="small"
                            sx={{ marginLeft: 'auto', color: '#ff9100', marginRight: '7px' }}
                          >
                            <PictureAsPdfIcon />
                          </IconButton>
                        )}
                        <span className="lesson-time">{lesson.time}</span>
                      </li>
                    );
                  })}
                </ul>
              </Collapse>
            </div>
          ))}
        </div>

        <div className="course-content">
          <h2>{currentLesson?.title}</h2>
          {currentLesson?.type === 'video' && (
            <>
              <p>{`${currentLesson.title} content description...`}</p>
              <video controls className="module-video">
                <source src="your-video-url.mp4" type="video/mp4" />
              </video>
              <button className="complete-button" onClick={markAsComplete}>
                Mark as Complete
              </button>
            </>
          )}

          {currentLesson?.type === 'quiz' && (
            <>
              {showInstructions ? (
                <>
                  <h3>Quiz Instructions</h3>
                  <ul className="instruction-page">
                    <li>Read each question carefully.</li>
                    <li>Select the most appropriate answer for each question.</li>
                    <li>You need to answer at least {currentLesson.quiz.passingMarks} questions correctly to pass the quiz.</li>
                    <li>You can navigate through questions using the pagination at the bottom.</li>
                    <li>Once you’ve answered all questions, click "Submit Quiz" to view results.</li>
                  </ul>
                  <button className="complete-button" onClick={() => setShowInstructions(false)}>
                    Start Quiz
                  </button>
                </>
              ) : (
                <>
                  {!showQuizFinalResults ? (
                    <>
                      <h3>{currentLesson.quiz.questions[quizPage - 1].question}</h3>
                      <ul className="quiz-options">
                        {currentLesson.quiz.questions[quizPage - 1].options.map((option, index) => (
                          <li
                            key={index}
                            onClick={() => handleQuizAnswer(quizPage - 1, index)}
                            className={quizAnswers[currentLesson.title]?.[quizPage - 1] === index ? 'selected' : ''}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                      <Pagination
                        count={currentLesson.quiz.questions.length}
                        page={quizPage}
                        onChange={handleQuizPageChange}
                      />
                      {quizPage === currentLesson.quiz.questions.length && (
                        <button className="complete-button" onClick={calculateQuizResults}>
                          Submit Quiz
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {renderQuizResponses()}
                      <button className="complete-button" onClick={resetQuiz}>
                        Retry Quiz
                      </button>
                    </>
                  )}
                </>
              )}
            </>
          )}

          <div className="navigation-buttons">
            <button onClick={navigatePrevious} disabled={isFirstLesson}>
              <ArrowBack /> Previous
            </button>
            <button onClick={navigateNext} disabled={isLastLesson}>
              Next <ArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom'; // For navigation
import { NavigateBefore } from '@mui/icons-material';
import './Styles/CreateCourse.css'; // Link to the external CSS file

const CreateCourse = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    category: '',
    level: '',
    primaryLanguage: '',
    subtitle: '',
    description: '',
    pricing: '',
    welcomeMessage: '',
    courseImage: null,
  });
  const [modules, setModules] = useState([]);
  const navigate = useNavigate(); // Hook to navigate

  const handleAddModule = () => {
    setModules([
      ...modules,
      { moduleName: '', moduleType: '', moduleContent: null, moduleVideo: null },
    ]);
  };

  const handleModuleChange = (index, key, value) => {
    const updatedModules = [...modules];
    updatedModules[index][key] = value;
    setModules(updatedModules);
  };

  const handleFileUpload = (key, index = null) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept =
      key === 'courseImage'
        ? 'image/*'
        : key === 'moduleVideo'
        ? 'video/*'
        : key === 'moduleContent'
        ? '.pdf'
        : '';
    fileInput.onchange = (e) => {
      if (key === 'courseImage') {
        setCourseDetails({ ...courseDetails, courseImage: e.target.files[0] });
      } else {
        handleModuleChange(index, key, e.target.files[0]);
      }
    };
    fileInput.click();
  };

  const handleSubmit = () => {
    console.log('Course Details:', courseDetails);
    console.log('Modules:', modules);
    alert('Course Created Successfully!');
  };

  const handleQuizRedirect = () => {
    navigate('/create-quiz'); // Adjust route path accordingly
  };

  return (
    <Box className="create-course-container">
      <Box className="section-tabs">
        <Button
          variant={currentSection === 1 ? 'contained' : 'outlined'}
          onClick={() => setCurrentSection(1)}
        >
          Course Details
        </Button>
        <Button
          variant={currentSection === 2 ? 'contained' : 'outlined'}
          onClick={() => setCurrentSection(2)}
        >
          Modules
        </Button>
      </Box>

      <Box className="section-content">
        {currentSection === 1 && (
          <Box className="course-details">
            <Box className="form-fields">
              <TextField
                label="Course Title"
                variant="outlined"
                fullWidth
                value={courseDetails.title}
                onChange={(e) => setCourseDetails({ ...courseDetails, title: e.target.value })}
              />
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={courseDetails.category}
                onChange={(e) => setCourseDetails({ ...courseDetails, category: e.target.value })}
              />
              <TextField
                label="Level (e.g., Beginner, Intermediate, Advanced)"
                variant="outlined"
                fullWidth
                value={courseDetails.level}
                onChange={(e) => setCourseDetails({ ...courseDetails, level: e.target.value })}
              />
              <TextField
                label="Primary Language"
                variant="outlined"
                fullWidth
                value={courseDetails.primaryLanguage}
                onChange={(e) => setCourseDetails({ ...courseDetails, primaryLanguage: e.target.value })}
              />
              <TextField
                label="Subtitle"
                variant="outlined"
                fullWidth
                value={courseDetails.subtitle}
                onChange={(e) => setCourseDetails({ ...courseDetails, subtitle: e.target.value })}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={courseDetails.description}
                onChange={(e) => setCourseDetails({ ...courseDetails, description: e.target.value })}
              />
              <TextField
                label="Pricing"
                variant="outlined"
                fullWidth
                type="number"
                value={courseDetails.pricing}
                onChange={(e) => setCourseDetails({ ...courseDetails, pricing: e.target.value })}
              />
              <TextField
                label="Welcome Message"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={courseDetails.welcomeMessage}
                onChange={(e) => setCourseDetails({ ...courseDetails, welcomeMessage: e.target.value })}
              />
              <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={() => handleFileUpload('courseImage')}
              >
                {courseDetails.courseImage
                  ? `Change Course Image (${courseDetails.courseImage.name})`
                  : 'Add Course Image'}
              </Button>
            </Box>
          </Box>
        )}

        {currentSection === 2 && (
          <Box className="modules-section">
            {modules.map((module, index) => (
              <Box key={index} className="module-container">
                <TextField
                  label="Module Name"
                  variant="outlined"
                  fullWidth
                  value={module.moduleName}
                  onChange={(e) => handleModuleChange(index, 'moduleName', e.target.value)}
                />
                <FormControl fullWidth>
                  <InputLabel>Module Type</InputLabel>
                  <Select
                    value={module.moduleType}
                    onChange={(e) => handleModuleChange(index, 'moduleType', e.target.value)}
                  >
                    <MenuItem value="" disabled>Select Module Type</MenuItem>
                    <MenuItem value="lecture">Lecture</MenuItem>
                    <MenuItem value="quiz">Quiz</MenuItem>
                  </Select>
                </FormControl>
                {module.moduleType === 'lecture' && (
                  <Box className="file-upload-buttons">
                    <Button
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => handleFileUpload('moduleContent', index)}
                    >
                      {module.moduleContent ? module.moduleContent.name : 'Add PDF'}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => handleFileUpload('moduleVideo', index)}
                    >
                      {module.moduleVideo ? module.moduleVideo.name : 'Add Video'}
                    </Button>
                  </Box>
                )}
                {module.moduleType === 'quiz' && (
                  <Button
                    variant="contained"
                    onClick={handleQuizRedirect}
                  >
                    Create Quiz
                  </Button>
                )}
              </Box>
            ))}
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddModule}
            >
              Add Module
            </Button>
          </Box>
        )}

        <Box className="footer-buttons">
          <Button
            variant="outlined"
            startIcon={<NavigateBefore />}
            onClick={() => setCurrentSection(1)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Create Course
          </Button>
        </Box>
      </Box>
    </Box>
  );
};


export default CreateCourse;

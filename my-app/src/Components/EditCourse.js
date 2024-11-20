import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete"; // Trash icon for delete
import { useNavigate, useParams } from "react-router-dom"; // For navigation
import { NavigateBefore } from "@mui/icons-material";
import "./Styles/EditCourse.css"; // Link to the external CSS file
import axios from "axios";

const EditCourse = ({ courseData }) => {
  const { id } = useParams();
  const [currentSection, setCurrentSection] = useState(1);
  const [courseDetails, setCourseDetails] = useState(
    courseData || {
      title: "",
      category: "",
      level: "",
      description: "",
      pricing: "",
      courseImage: null,
    }
  );
  const [modules, setModules] = useState(courseData?.modules || []);
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/instructor/course/get/details/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        const result = await response.json();
        console.log('Fetched course data:', result); // Log the response data
  
        // Update courseDetails to just the 'data' object
        if (result.success) {
          setCourseDetails(result.data); // Set only the 'data' part
          setModules(result.data.curriculum || []); // Set the curriculum (modules)
        } else {
          alert('Failed to fetch course details.');
        }
  
        console.log('Updated courseDetails:', result.data); // Log after updating courseDetails
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleAddModule = () => {
    setModules([
      ...modules,
      {
        moduleName: "",
        moduleType: "",
        moduleContent: null,
        moduleVideo: null,
      },
    ]);
  };

  const handleModuleChange = (index, key, value) => {
    const updatedModules = [...modules];
    updatedModules[index][key] = value;
    setModules(updatedModules);
  };

  const handleFileUpload = (key, index = null) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept =
      key === "courseImage"
        ? "image/*"
        : key === "moduleVideo"
        ? "video/*, audio/mp3"
        : key === "moduleContent"
        ? ".pdf"
        : "";
    fileInput.onchange = (e) => {
      if (key === "courseImage") {
        setCourseDetails({ ...courseDetails, courseImage: e.target.files[0] });
      } else {
        handleModuleChange(index, key, e.target.files[0]);
      }
    };
    fileInput.click();
  };

  const handleDeleteModule = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
  };

  const handleSubmit = async () => {
    // Check if all required fields are filled out
    if (
      !courseDetails.title ||
      !courseDetails.category ||
      !courseDetails.level ||
      !courseDetails.description ||
      !courseDetails.pricing ||
      !courseDetails.courseImage
    ) {
      alert("Please fill all the required fields.");
      return;
    }
  
    // Prepare data for submission
    const updatedCourseData = {
      ...courseDetails,
      modules: modules,
    };
  
    // API request to update course using PUT
    try {
      const response = await fetch(`http://localhost:8000/instructor/course/update/${id}`, {
        method: "PUT", // Ensure PUT method is used
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCourseData),
      });
  
      if (response.ok) {
        alert("Course Updated Successfully!");
      } else {
        alert("Error updating course.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };
  
  const handleQuizRedirect = () => {
    navigate("/edit-quiz"); // Adjust route path accordingly
  };

  return (
    <Box className="edit-course-container">
      <Box className="section-tabs">
        <Button
          variant={currentSection === 1 ? "contained" : "outlined"}
          onClick={() => setCurrentSection(1)}
        >
          Course Details
        </Button>
        <Button
          variant={currentSection === 2 ? "contained" : "outlined"}
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
                onChange={(e) =>
                  setCourseDetails({ ...courseDetails, title: e.target.value })
                }
                required
              />
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={courseDetails.category}
                onChange={(e) =>
                  setCourseDetails({
                    ...courseDetails,
                    category: e.target.value,
                  })
                }
                required
              />
              <TextField
                label="Level (e.g., Beginner, Intermediate, Advanced)"
                variant="outlined"
                fullWidth
                value={courseDetails.level}
                onChange={(e) =>
                  setCourseDetails({ ...courseDetails, level: e.target.value })
                }
                required
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={courseDetails.description}
                onChange={(e) =>
                  setCourseDetails({
                    ...courseDetails,
                    description: e.target.value,
                  })
                }
                required
              />
              <TextField
                label="Pricing"
                variant="outlined"
                fullWidth
                type="number"
                value={courseDetails.pricing}
                onChange={(e) =>
                  setCourseDetails({
                    ...courseDetails,
                    pricing: e.target.value,
                  })
                }
                required
              />
              <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={() => handleFileUpload("courseImage")}
              >
                {courseDetails.image
                  ? `Change Course Image (${courseDetails.image})`
                  : "Add Course Image"}
              </Button>
            </Box>
          </Box>
        )}

        {currentSection === 2 && (
          <Box className="modules-section">
            {modules.map((module, index) => (
              <Box key={index} className="module-container">
                {/* Display module number */}
                <Box className="module-number">
                  <strong>Module {index + 1}</strong>
                </Box>

                <TextField
                  label="Module Name"
                  variant="outlined"
                  fullWidth
                  value={module.moduleName}
                  onChange={(e) =>
                    handleModuleChange(index, "moduleName", e.target.value)
                  }
                  required
                />
                <FormControl fullWidth>
                  <InputLabel>Module Type</InputLabel>
                  <Select
                    value={module.moduleType}
                    onChange={(e) =>
                      handleModuleChange(index, "moduleType", e.target.value)
                    }
                    required
                  >
                    <MenuItem value="" disabled>
                      Select Module Type
                    </MenuItem>
                    <MenuItem value="lecture">Lecture</MenuItem>
                    <MenuItem value="quiz">Quiz</MenuItem>
                  </Select>
                </FormControl>
                {module.moduleType === "lecture" && (
                  <Box className="file-upload-buttons">
                    <Button
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => handleFileUpload("moduleContent", index)}
                    >
                      {module.moduleContent
                        ? module.moduleContent.name
                        : "Add PDF"}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => handleFileUpload("moduleVideo", index)}
                    >
                      {module.moduleVideo
                        ? module.moduleVideo.name
                        : "Add Video"}
                    </Button>
                  </Box>
                )}
                {module.moduleType === "quiz" && (
                  <Button variant="contained" onClick={handleQuizRedirect}>
                    Edit Quiz
                  </Button>
                )}

                {/* Delete Button */}
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteModule(index)}
                  className="delete-module-btn"
                >
                  Delete Module
                </Button>
              </Box>
            ))}
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
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
          <Button variant="contained" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditCourse;

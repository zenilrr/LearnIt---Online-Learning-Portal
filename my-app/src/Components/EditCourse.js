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
import { Link, useNavigate, useParams } from "react-router-dom"; // For navigation
import { NavigateBefore } from "@mui/icons-material";
import "./Styles/EditCourse.css"; // Link to the external CSS file
import axios from "axios";
import Header2 from "./HeaderAfterSignIn";
import Footer from "./Footer";

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
      !courseDetails.pricing
    ) {
      alert("Please fill all the required fields.");
      return 0;
    }

    else if(courseDetails.pricing<0){
      alert("Price of the course must be non-zero integer.");
      return 0;
    }

    else if(courseDetails.level!="Beginner" || courseDetails.level!="Intermediate" || courseDetails.level!="Advanced"){
      alert("Chose an appropriate level.");
      return 0;
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
        window.location.href = '/instructor-dashboard';
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

  const FileUploadButton = ({ label, onChange, fileName }) => (
    <Button classname="edit_course_btn"
      sx={{
        backgroundColor: '#FF7900',
        color: '#FFFFFF',
        '&:hover': { backgroundColor: '#FF7900' },
      }}
      variant="outlined"
      startIcon={<CloudUploadIcon />}
      onClick={() => onChange()}
    >
      {fileName ? fileName : label}
    </Button>
  );

  return (
     <>
     <Header2></Header2>
    <Box className="edit-course-container">
      <Box className="edit-section-tabs">
        <Button classname="edit_course_btn"
          sx={{
            backgroundColor: currentSection === 1 ? "#FF7900" : "transparent",
            color: currentSection === 1 ? "#fff" : "#000",
            "&:hover": { backgroundColor: "#FF7900" },
          }}
          variant="contained"
          onClick={() => setCurrentSection(1)}
        >
          Course Details
        </Button>
        <Button classname="edit_course_btn"
          sx={{
            backgroundColor: currentSection === 2 ? "#FF7900" : "transparent",
            color: currentSection === 2 ? "#fff" : "#000",
            "&:hover": { backgroundColor: "#FF7900" },
          }}
          variant="contained"
          onClick={() => setCurrentSection(2)}
        >
          Modules
        </Button>
      </Box>

      <Box className="edit-section-content">
        {currentSection === 1 && (
          <Box className="edit-course-details" sx={{ backgroundColor: '#1f3064' }}>
            <Box className="edit-form-fields">
              <TextField
                label="Course Title"
                variant="outlined"
                sx={{
                  '& label': {
                    color: 'white', // Default label color when not focused
                  },
                  '& label.Mui-focused': {
                    color: '#FF7900', // Orange color when the label is focused
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'grey', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#FF7900', // Orange color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF7900', // Orange color when focused
                    },
                    '& input': {
                      color: 'white', // Text color inside input
                    },
                  },
                  backgroundColor: '#000e3dfb',
                  borderRadius: '5px',
                }}
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
                sx={{
                  '& label': {
                    color: 'white', // Default label color when not focused
                  },
                  '& label.Mui-focused': {
                    color: '#FF7900', // Orange color when the label is focused
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'grey', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#FF7900', // Orange color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF7900', // Orange color when focused
                    },
                    '& input': {
                      color: 'white', // Text color inside input
                    },
                  },
                  backgroundColor: '#000e3dfb',
                  borderRadius: '5px',
                }}
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
                sx={{
                  '& label': {
                    color: 'white', // Default label color when not focused
                  },
                  '& label.Mui-focused': {
                    color: '#FF7900', // Orange color when the label is focused
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'grey', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#FF7900', // Orange color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF7900', // Orange color when focused
                    },
                    '& input': {
                      color: 'white', // Text color inside input
                    },
                  },
                  backgroundColor: '#000e3dfb',
                  borderRadius: '5px',
                }}
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
                sx={{
                  '& label': {
                    color: 'white', // Default label color when not focused
                  },
                  '& label.Mui-focused': {
                    color: '#FF7900', // Orange color when the label is focused
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'grey', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#FF7900', // Orange color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF7900', // Orange color when focused
                    },
                    '& input': {
                      color: '#f9f9f9', // Text color inside input
                    },
                  },
                  backgroundColor: '#000e3dfb',
                  borderRadius: '5px',
                }}
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
                sx={{
                  '& label': {
                    color: 'white', // Default label color when not focused
                  },
                  '& label.Mui-focused': {
                    color: '#FF7900', // Orange color when the label is focused
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'grey', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#FF7900', // Orange color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF7900', // Orange color when focused
                    },
                    '& input': {
                      color: 'white', // Text color inside input
                    },
                  },
                  backgroundColor: '#000e3dfb',
                  borderRadius: '5px',
                }}
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
            <FileUploadButton
              label={courseDetails.courseImage ? "Image Uploaded" : "Add Course Image"}
              onChange={() => handleFileUpload("courseImage")}
              fileName={courseDetails.courseImage ? courseDetails.courseImage.name : ""}
            />

            </Box>
          </Box>
        )}

        {currentSection === 2 && (
          <Box className="edit-modules-section" sx={{ backgroundColor: '#1f3064' }}>
            {modules.map((module, index) => (
              <Box key={index} className="edit-module-container" sx={{ backgroundColor: '#1f3064' }}>
                {/* Display module number */}
                <Box className="module-number">
                  <strong>Module {index + 1}</strong>
                </Box>

                <TextField
                  label="Module Name"
                  variant="outlined"
                  sx={{
                    '& label': {
                      color: 'white', // Default label color when not focused
                    },
                    '& label.Mui-focused': {
                      color: '#FF7900', // Orange color when the label is focused
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'grey', // Default border color
                      },
                      '&:hover fieldset': {
                        borderColor: '#FF7900', // Orange color on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF7900', // Orange color when focused
                      },
                      '& input': {
                        color: 'white', // Text color inside input
                      },
                    },
                    backgroundColor: '#000e3dfb',
                    borderRadius: '5px',
                    marginBottom: '20px'
                  }}
                  fullWidth
                  value={module.moduleName}
                  onChange={(e) =>
                    handleModuleChange(index, "moduleName", e.target.value)
                  }
                  required
                />
                <FormControl fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'grey', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#FF7900', // Orange on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF7900', // Orange when focused
                    },
                  },
                  backgroundColor: '#000e3dfb',
                  borderRadius: '5px',
                }}
                >
                  <InputLabel
                    sx={{
                      color: 'white', // Default label color
                      '&.Mui-focused': {
                        color: '#FF7900', // Orange color when focused
                      },
                    }}>Module Type</InputLabel>
                  <Select
                    value={module.moduleType}
                    label="Module Type"
                    sx={{
                      color: 'white', // Text color inside input
                    }}
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
                  <Box className="edit-file-upload-buttons">
                    <Button classname="edit_course_btn"
                      sx={{
                        backgroundColor: '#FF7900', // Orange color
                        color: '#FFFFFF', // White text
                        '&:hover': {
                          backgroundColor: '#FF7900', // Prevent color change on hover
                        },
                        marginRight: '20px',
                        marginTop: '20px'
                      }}
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => handleFileUpload("moduleContent", index)}
                    >
                      {module.moduleContent
                        ? module.moduleContent.name
                        : "Add PDF"}
                    </Button>
                    <Button classname="edit_course_btn"
                      sx={{
                        backgroundColor: '#FF7900', // Orange color
                        color: '#FFFFFF', // White text
                        '&:hover': {
                          backgroundColor: '#FF7900', // Prevent color change on hover
                        },
                        marginRight: '20px',
                        marginTop: '20px'
                      }}
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
                  <Button classname="edit_course_btn" 
                  sx={{
                    backgroundColor: '#FF7900', // Orange color
                    color: '#FFFFFF', // White text
                    '&:hover': {
                      backgroundColor: '#FF7900', // Prevent color change on hover
                    },
                    marginRight: '20px',
                    marginTop: '20px'
                  }}
                  variant="contained" onClick={handleQuizRedirect}>
                    Edit Quiz
                  </Button>
                )}
                {/* Delete Button */}
                <Button classname="edit_course_btn"
                      sx={{
                        backgroundColor: '#FF7900', // Orange color
                        color: '#FFFFFF', // White text
                        '&:hover': {
                          backgroundColor: '#FF7900', // Prevent color change on hover
                        },
                        marginRight: '20px',
                        marginTop: '20px'
                      }}
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteModule(index)}
                >
                  Delete Module
                </Button>
              </Box>
            ))}
            <Button classname="edit_course_btn"
              sx={{
                backgroundColor: "#FF7900",
                color: "#FFFFFF",
                "&:hover": { backgroundColor: "#FF7900" },
              }}
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={handleAddModule}
            >
              Add Module
            </Button>
          </Box>
        )}

        <Box className="edit-footer-buttons">
        <Button classname="edit_course_btn"
  variant="outlined"
  startIcon={<NavigateBefore />}
  onClick={() => {
    if (currentSection === 2) {
      setCurrentSection(1);
    } else {
      window.location.href = '/instructor-dashboard'; // Replace '?' with the desired path
    }
  }}
>
  Back
</Button>

<Button classname="edit_course_btn"
  variant="contained"
  onClick={() => {
    handleSubmit()
  }}
>
  Save Changes
</Button>

        </Box>
      </Box>
    </Box>
    <Footer></Footer>
    </>
  );
};

export default EditCourse;

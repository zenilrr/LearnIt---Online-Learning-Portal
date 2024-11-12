import React, { useState } from 'react';
import { TextField, Button, Tabs, Tab, Typography, Box, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

// Outer wrapper to color the margin
const Wrapper = styled('div')({
  // backgroundColor: 'green',  // Green color for margin space
  backgroundColor: '#fff',
  // background: 'linear-gradient(180deg, #000e3d, #091749, #122058, #192661)',
  padding: '40px',  // This will create a space around the container with green color
});

const Container = styled('div')(({ theme }) => ({
  backgroundColor: "#0A1F44",
  color: "#ffffff",
  padding: '40px 20px 60px',  // Padding for top, left, bottom, right
  borderRadius: '8px',
  width: '90%',
  margin: '0 auto', // Center the container and remove the margin for the container itself
  position: 'relative', // To allow the positioning of the submit button
  fontFamily: "'Poppins', sans-serif"
}));

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: '#1f3064',
  borderRadius: '8px',
}));

const SubmitButton = styled(Button)({
  position: 'absolute',
  top: '20px',
  right: '20px',
  backgroundColor: '#FF8C00',
  color: '#fff',
  fontFamily: "'Poppins', sans-serif",
  '&:hover': {
    backgroundColor: '#FF7000',
  },
});

const StyledTextField = styled(TextField)(({
  marginBottom: "20px",
  backgroundColor: '#0A1F44',
  borderRadius: 4,
  "& .MuiInputBase-input": {
    color: "#ffffff", // Text color inside the input
  },
  "& .MuiInputLabel-root": {
    color: "#aaaaaa", // Label color
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#555555", // Border color
    },
    "&:hover fieldset": {
      borderColor: "#888888", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff9800", // Border color when focused
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#888888", // Placeholder text color
  },
  fontFamily: "'Poppins', sans-serif",
}));


const FileInput = styled('input')({
  display: 'none', // Hides the default file input
});

const UploadVideoComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Section>
      <Typography variant="h6" color="white" sx={{ marginBottom: 2 }}>
        Upload Videos
      </Typography>
      <Button 
        variant="contained" 
        component="label" 
        sx={{
          width: '200px', // Fixed width
          height: '50px', // Fixed height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ff8c00', // Custom button color
          padding: 0, // Remove padding to ensure exact size
          '&:hover': {
            backgroundColor: '#e87a00', // Slightly darker on hover
          }
        }}
      >
        Upload File
        <FileInput 
          type="file" 
          onChange={handleFileChange} 
          accept="video/*" // Only accept video files
        />
      </Button>
      
      {selectedFile && (
        <Box sx={{ marginTop: 2, color: 'white' }}>
          <Typography variant="body2">
            <strong>Selected File:</strong> {selectedFile.name}
          </Typography>
        </Box>
      )}
    </Section>
  );
};


function CreateCourse() {
  const [tabValue, setTabValue] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    title: '',
    category: '',
    level: '',
    language: '',
    subtitle: '',
    description: '',
    pricing: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    setCourseInfo({
      ...courseInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Wrapper>
      <Container>
        <Typography variant="h4" gutterBottom>
          Create a New Course
        </Typography>

        {/* Submit button at the top-right corner */}
        <SubmitButton variant="contained">SUBMIT</SubmitButton>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#FF8C00', // Orange indicator color
            },
            '& .MuiTab-root': {
              color: '#ffffff', // White text color for normal (inactive) tabs
            },
            '& .MuiTab-root.Mui-selected': {
              color: '#FF8C00', // Orange text color for the selected tab
            },
          }}
          style={{ marginBottom: '20px', fontFamily: "'Poppins', sans-serif" }}
        >
          <Tab label="Course Details" />
          <Tab label="Curriculum" />
          <Tab label="Upload Videos" />
          <Tab label="Settings" />
        </Tabs>

        {tabValue === 0 && (
          <Section>
            <Typography variant="h6">Course Landing Page</Typography>
            <StyledTextField
              fullWidth
              label="Title"
              name="title"
              value={courseInfo.title}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />

            <StyledTextField
              fullWidth
              select
              label="Category"
              name="category"
              value={courseInfo.category}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="" disabled>
                Category
              </MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </StyledTextField>

            <StyledTextField
              fullWidth
              label="Subtitle"
              name="subtitle"
              value={courseInfo.subtitle}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <StyledTextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={courseInfo.description}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <StyledTextField
              fullWidth
              label="Pricing"
              name="pricing"
              value={courseInfo.pricing}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Section>
        )}

        {tabValue === 1 && (
          <Section>
            <Typography variant="h6">Curriculum</Typography>
            <StyledTextField
              fullWidth
              label="Module Title"
              variant="outlined"
              margin="normal"
            />
            <StyledTextField
              fullWidth
              multiline
              rows={2}
              label="Module Description"
              variant="outlined"
              margin="normal"
            />
          </Section>
        )}

        {tabValue === 2 && (
          // <Section>
          //   <Typography variant="h6">Upload Videos</Typography>
          //   <Button variant="contained" component="label" color="secondary">
          //     Upload File
          //     <input type="file" hidden />
          //   </Button>
          // </Section>
          <UploadVideoComponent />
        )}

        {tabValue === 3 && (
          <Section>
            <Typography variant="h6">Settings</Typography>
            <StyledTextField
              fullWidth
              label="Course Visibility"
              variant="outlined"
              margin="normal"
            />
          </Section>
        )}
      </Container>
    </Wrapper>
  );
}

export default CreateCourse;

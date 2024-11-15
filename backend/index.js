require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/auth-routes/index");
const studentViewCourseRoutes = require("./Routes/student-routes/course-routes");
const mediaRoutes = require("./Routes/instructor-routes/media-routes");
const instructorCourseRoutes = require("./Routes/instructor-routes/course-routes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

//database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e));


  
//routes
app.use("/auth", authRoutes);
app.use("/student/course", studentViewCourseRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor/course", instructorCourseRoutes);
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
});
  
  app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
  });

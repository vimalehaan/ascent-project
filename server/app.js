const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollmentRoutes);

module.exports = app;

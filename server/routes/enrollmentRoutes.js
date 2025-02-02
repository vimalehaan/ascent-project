const express = require('express');

const { enrollCourse, getEnrolledCourses, unenrollCourse } = require("../controllers/enrollmentController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:courseId", authenticateToken, enrollCourse);
router.get("/courses", authenticateToken, getEnrolledCourses);
router.delete("/unenroll/:courseId", authenticateToken, unenrollCourse);

module.exports = router;
const express = require("express");

const { createCourse, getAllCourses, getCourseById} = require("../controllers/courseController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createCourse);
router.get("/", authenticateToken, getAllCourses);
router.get("/:courseId", authenticateToken, getCourseById);


module.exports = router;

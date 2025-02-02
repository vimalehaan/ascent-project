const express = require("express");

const { createCourse, getAllCourses } = require("../controllers/courseController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createCourse);
router.get("/", authenticateToken, getAllCourses);


module.exports = router;

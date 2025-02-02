const { sql, getDbConnection } = require("../db");

const createCourse = async (req, res) => {
  try {
    const { title, description, content } = req.body;

    if (!title || !description || !content) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const pool = await getDbConnection();
    const result = await pool
      .request()
      .input("title", sql.NVarChar, title)
      .input("description", sql.NVarChar, description)
      .input("content", sql.NVarChar, content)
      .query(
        "INSERT INTO Courses (title, description, content) VALUES (@title, @description, @content); SELECT SCOPE_IDENTITY() AS id",
      );

    res.status(201).json({
      message: "Course created successfully",
      courseId: result.recordset[0].id,
    });
  } catch (error) {
    console.error("Course creation error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const pool = await getDbConnection();

    const result = await pool.request().query("SELECT * FROM Courses");

    res.status(200).json({ courses: result.recordset });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createCourse, getAllCourses };

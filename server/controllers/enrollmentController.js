const { sql, getDbConnection } = require("../db");

const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.student.studentId;

    if (!courseId) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    const pool = await getDbConnection();

    const checkCourse = await pool
      .request()
      .input("courseId", sql.Int, courseId)
      .query("SELECT id FROM Courses WHERE id = @courseId");

    if (checkCourse.recordset.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    const checkEnrollment = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .input("courseId", sql.Int, courseId)
      .query(
        "SELECT * FROM StudentCourses WHERE student_id = @studentId AND course_id = @courseId",
      );

    if (checkEnrollment.recordset.length > 0) {
      return res
        .status(400)
        .json({ error: "Student is already enrolled in this course" });
    }

    const result = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .input("courseId", sql.Int, courseId)
      .query(
        "INSERT INTO StudentCourses (student_id, course_id) VALUES (@studentId, @courseId)",
      );

    res.status(201).json({
      message: "Student enrolled in course successfully",
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.student.studentId;

    const pool = await getDbConnection();

    const result = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .query(
        `SELECT c.id, c.title, c.description, c.content
            FROM Courses c
            INNER JOIN StudentCourses sc ON c.id = sc.course_id
            WHERE sc.student_id = @studentId`,
      );

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "No enrolled courses found" });
    }

    res.status(200).json({ enrolledCourses: result.recordset });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const unenrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.student.studentId;

    if (!courseId) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    const pool = await getDbConnection();

    const checkCourse = await pool
      .request()
      .input("courseId", sql.Int, courseId)
      .query("SELECT id FROM Courses WHERE id = @courseId");

    if (checkCourse.recordset.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    // const checkEnrollment = await pool
    //   .request()
    //   .input("studentId", sql.Int, studentId)
    //   .input("courseId", sql.Int, courseId)
    //   .query(
    //     "SELECT * FROM StudentCourses WHERE student_id = @studentId AND course_id = @courseId",
    //   );
    //
    // if (checkEnrollment.recordset.length === 0) {
    //   return res
    //     .status(400)
    //     .json({ error: "Student is not enrolled in this course" });
    // }

    const result = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .input("courseId", sql.Int, courseId)
      .query(
        `DELETE FROM StudentCourses 
         WHERE student_id = @studentId AND course_id = @courseId`,
      );
    console.log(result);

    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ message: "Student is not enrolled in this course" });
    }

    res
      .status(200)
      .json({ message: "Successfully unenrolled from the course" });
  } catch (error) {
    console.error("Error unenrolling from course:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { enrollCourse, getEnrolledCourses, unenrollCourse };

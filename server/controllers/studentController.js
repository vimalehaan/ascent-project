const bcrypt = require("bcrypt");
const { sql, getDbConnection } = require("../db");
const e = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_Secret = process.env.JWT_SECRET;

const registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    const pool = await getDbConnection();

    const emailCheck = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT id FROM Students WHERE email = @email");

    console.log(emailCheck);

    if (emailCheck.recordset.length > 0) {
      return res.status(409).json({
        error: "Email already registered. Please use a different email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashedPassword)
      .query(
        "INSERT INTO Students (name, email, password) VALUES (@name, @email, @password); SELECT SCOPE_IDENTITY() AS id",
      );

    res.status(201).json({
      message: "Student registered successfully",
      studentId: result.recordset[0].id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const pool = await getDbConnection();

    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(
        "SELECT id, name, email, password FROM Students WHERE email = @email",
      );

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const student = result.recordset[0];

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { studentId: student.id, name: student.name },
      jwt_Secret,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Student login successfully",
      token: token,
      Student: {
        id: student.id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { registerStudent, loginStudent };

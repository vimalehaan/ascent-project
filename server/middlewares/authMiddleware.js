const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_Secret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, jwt_Secret);
    req.student = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = authenticateToken;

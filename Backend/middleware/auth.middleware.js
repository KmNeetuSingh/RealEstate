const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallbacksecret");
    req.user = decoded; // Attach user ID and role from JWT to request
    next();
  } catch (err) {
    console.error("❌ Invalid Token:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

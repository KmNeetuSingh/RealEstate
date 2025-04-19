const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const connection = require("./config/db");
const teamRoutes = require("./routes/team.routes");

// ✅ Load .env
dotenv.config();

// Initialize express app
const app = express();

// Use CORS globally
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/teams", teamRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send("Server running! Health Check Done");
});

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, async () => {
  try {
    await connection();
    console.log("✅ MongoDB connected");
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (err) {
    console.log("❌ DB connection failed:", err.message);
  }
});

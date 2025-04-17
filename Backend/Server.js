require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors package
const authRoutes = require("./routes/auth.routes");
const propertyRoutes = require("./routes/property.routes");
const adminRoutes = require("./routes/admin.routes");
const connection = require("./config/db"); // ✅ import DB connection

const app = express();

// Enable CORS (allow all origins, adjust as needed)
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin (adjust if needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow methods you need
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers you need
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Declare PORT
const PORT = process.env.PORT || 3000;

// ✅ Start server after DB connection
app.listen(PORT, async () => {
  try {
    await connection();
    console.log("✅ MongoDB connected");
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (err) {
    console.log("❌ DB connection failed:", err.message);
  }
});

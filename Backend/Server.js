require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const propertyRoutes = require("./routes/property.routes");
const adminRoutes = require("./routes/admin.routes");
const connection = require("./config/db");

const app = express();

// 🔁 CORS Configuration
const devOrigins = ["http://localhost:5173"];
const prodOrigins = ["https://real-estate-wnzo.vercel.app"];
const allowedOrigins = process.env.NODE_ENV === "production" ? prodOrigins : devOrigins;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// 🔗 Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);

// 🚀 Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await connection();
    console.log("✅ MongoDB connected");
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
});

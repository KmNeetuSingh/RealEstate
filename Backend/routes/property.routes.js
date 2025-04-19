const express = require("express");
const router = express.Router();
const {
  createProperty,
  getAllProperties,
  deleteProperty,  // ✅ Import delete controller
} = require("../controllers/property.controller");
const authMiddleware = require("../middleware/auth.middleware");

// 🏠 Routes
router.post("/", authMiddleware, createProperty);       // Create a property
router.get("/", getAllProperties);                      // Get all properties
router.delete("/:id", authMiddleware, deleteProperty);  // ❌ Delete a property by ID

module.exports = router;

const express = require("express");
const router = express.Router();
const { createProperty, getAllProperties } = require("../controllers/property.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createProperty);
router.get("/", getAllProperties);

module.exports = router;

              
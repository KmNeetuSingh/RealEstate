const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware")
const { register, login ,getProfile} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/profile",authMiddleware,getProfile)


module.exports = router;

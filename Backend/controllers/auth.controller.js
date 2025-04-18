const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register Controller
const register = async (req, res) => {
  try {
    console.log("Register endpoint hit:", req.body);
    const { name, email, password, role } = req.body;

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      name,
      email: normalizedEmail, // Store normalized email
      password: hashedPassword,
      role: role || "user", // Default to 'user' if no role provided
    });
    console.log("User registered:", user);

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Respond with user details and token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already registered" });
    }
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    console.log("Email received in login:", email);

    // Check if email is provided
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Find the user by normalized email
    const user = await User.findOne({ email: normalizedEmail });
    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if role is provided
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    // Role must match
    if (user.role !== role) {
      console.log("Role mismatch. Expected:", user.role, "Received:", role);
      return res.status(403).json({ message: "Access denied for this user type" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Respond with user details and token
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

module.exports = { register, login };

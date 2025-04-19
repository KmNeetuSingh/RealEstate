const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register Controller
const register = async (req, res) => {
  try {
    console.log("➡️ Register Request Body:", req.body);

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      console.log("❌ Missing fields during registration");
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    console.log("📩 Normalized Email:", normalizedEmail);

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      console.log("⚠️ Email already registered:", normalizedEmail);
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: password.trim(), // 👈 Pass plain password, schema will hash it
      role: role || "user",
    });

    console.log("✅ User Created:", user);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "fallbacksecret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

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
    console.error("🔥 Registration error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already registered" });
    }
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    console.log("➡️ Login Request Body:", req.body);

    const { email, password, role } = req.body;

    if (!email || !password) {
      console.log("❌ Missing email or password during login");
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    console.log("📩 Normalized Email:", normalizedEmail);

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      console.log("❌ No user found with this email");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Check role if provided
    if (role && user.role !== role) {
      console.log("⛔ Role mismatch. Expected:", user.role, "Provided:", role);
      return res.status(403).json({ message: "Access denied for this user type" });
    }

    const isMatch = await user.comparePassword(password.trim()); // 👈 Use model method
    console.log("✅ Password Match Result:", isMatch);

    if (!isMatch) {
      console.log("❌ Passwords do not match");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "fallbacksecret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

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
    console.error("🔥 Login error:", err);
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

module.exports = { register, login };

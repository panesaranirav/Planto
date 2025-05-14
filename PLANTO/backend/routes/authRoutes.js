import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// 🔹 REGISTER
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    if (!firstname || !lastname || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstname, lastname, email, phone, password: hashedPassword, profileImage });

    await newUser.save();
    console.log("New user registered:", newUser);

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        profileImage: newUser.profileImage ? `http://localhost:5173/uploads/${newUser.profileImage}` : null,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error, please try again!" });
  }
});

// 🔹 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found, please register" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    res.json({
      success: true,
      message: "Login successful!",
      user: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        profileImage: user.profileImage ? `http://localhost:5173/uploads/${user.profileImage}` : null,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




export default router;

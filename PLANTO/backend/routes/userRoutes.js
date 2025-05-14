import express from "express";
import User from "../models/User.js";
import path from "path";

const router = express.Router();

// Use import.meta.url to get the current directory path
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Serve static files from the "uploads" folder
const uploadPath = path.join(__dirname, "uploads");
router.use("/uploads", express.static(uploadPath));

// 🔹 Get User Profile
router.get("/user-profile", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: "Email is required" });

    console.log("Email received in backend:", email);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    console.log("User found:", user); 
    
    // Handle profile image path
    const profileImageUrl = user.profileImage
      ? `http://localhost:5000/uploads/${user.profileImage}`
      : null;

    res.json({
      success: true,
      user: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        profileImage: profileImageUrl,
      },
    });
  } catch (err) {
    console.error("Error in backend:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

export default router;

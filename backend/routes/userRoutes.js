import express from "express";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Get User Profile
router.get("/user-profile", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: "Email is required" });
    console.log("Email received in backend:", email);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    console.log("User found:", user); 
    
    res.json({
      success: true,
      user: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        profileImage: user.profileImage ? `http://localhost:5000/uploads/${user.profileImage}` : null,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error",err });
  }
});

export default router;

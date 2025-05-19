import express from "express";
import User from "../models/User.js";
import path from "path";

const router = express.Router();

// Use import.meta.url to get the current directory path
const __filename = fileURLToPath(import.meta.url);
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
  

    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(404).json({ error: "User not found" });

    console.log("User found:", user); 
    
    // Handle profile image path
    const baseUrl = req.protocol + '://' + req.get('host');
const profileImageUrl = user.profileImage
  ? `${baseUrl}/uploads/${user.profileImage}`
  : null;


    res.json({
      success: true,
      user: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phoneNumber: user.phoneNumber,
        profileImage: profileImageUrl,
      },
    });
    
  } catch (err) {
    console.error("Error in backend:", err);
    res.status(500).json({ error: "Server error", err });
  }
});

router.put('/update-profile', async (req, res) => {
  try {
    const { email, firstname, lastname, phoneNumber } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { firstname, lastname, phoneNumber },
      { new: true }
    );
    res.json({ updatedUser });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

router.delete('/delete-profile', async (req, res) => {
  try {
    const { email } = req.query;
    await User.findOneAndDelete({ email });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});



export default router;

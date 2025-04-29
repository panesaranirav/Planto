import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Serve static images
app.use("/uploads", express.static("uploads"));

// 🔹 Connect to Database
connectDB();

// 🔹 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

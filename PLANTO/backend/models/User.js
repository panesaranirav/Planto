import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
  profileImage: String, // Profile image filename
});

const User = mongoose.model("User", UserSchema);
export default User;

import mongoose from "mongoose";

const resetSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 900 }
});

export default mongoose.model("PasswordReset", resetSchema);
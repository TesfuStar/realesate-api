import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    otp: { type: Number },
  },
  { timestamps: true }
);

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;

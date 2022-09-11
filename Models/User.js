import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    profile: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    email: { type: String, unique: true },
    phone: { type: Number, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);
const User = mongoose.model("Users", userSchema);

export default User;

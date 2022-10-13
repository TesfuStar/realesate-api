import mongoose from "mongoose";
const AgentSchema = new mongoose.Schema(
  {
    companyId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profile: {
      type: String,
    },
    phone: { type: [String], required: true },
    email: { type: String },
    hasCompany: { type: Boolean, default: false },
    comments: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", AgentSchema);

export default Agent;

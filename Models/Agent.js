import mongoose from "mongoose";
const AgentSchema = new mongoose.Schema(
  {
    companyId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profile: {type: String,default:null},
    phone: { type: [String], required: true,unique:true },
    email: { type: String,default:null },
    hasCompany: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", AgentSchema);

export default Agent;

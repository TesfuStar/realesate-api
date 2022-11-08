import mongoose from "mongoose";
const AgentSchema = new mongoose.Schema(
  {
    companyId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profile: {type: String,  default:
      "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",},
    phone: { type: [String], required: true,unique:true },
    email: { type: String,default:null },
    hasCompany: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", AgentSchema);

export default Agent;

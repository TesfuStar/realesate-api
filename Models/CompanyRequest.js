import mongoose from "mongoose";
const companyRequestSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    logo: { type: String},
    address: { type: String, required: true }, //main office
    phone: { type: String, required: true, unique: true },
    comment: { type: String },
    isApproved: { type: Boolean, default: false },
    isRejected:{type:Boolean,default:false},
    status:{type: String ,default:"Pending"}
  },
  { timestamps: true }
);

const CompanyRequest = mongoose.model("CompanyRequest", companyRequestSchema);

export default CompanyRequest;

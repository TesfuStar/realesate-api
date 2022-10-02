import CompanyRequest from "../Models/CompanyRequest.js";
import User from '../Models/User.js'
import Owner from '../Models/Owner.js'
import _ from 'lodash'
export const createCompanyRequest = async (req, res) => {
  const newCompanyRequest = new CompanyRequest(req.body);
  try {
    const savedCompanyRequest = await newCompanyRequest.save();
    res.status(201).json({success:true,data:savedCompanyRequest});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//landing profile
export const userLandingProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const company = await CompanyRequest.findOne({userId:req.params.id})
    res.status(200).json({success:true,data:{user:user,company:company}});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//get all company request

export const getAllCompanyRequest = async (req, res) => {
  try {
    const allCompanyRequest = await CompanyRequest.find({isApproved:false}).sort({createdAt:-1});
    res.status(200).json({success:true,data:allCompanyRequest});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all Accepted company request

export const getAllAcceptedCompanyRequest = async (req, res) => {
  try {
    const allCompanyRequest = await CompanyRequest.find({isApproved:true}).sort({createdAt:-1});
    res.status(200).json({success:true,data:allCompanyRequest});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get Single(Detail) company request

export const getSingleCompanyRequest = async (req, res) => {
  try {
    const companyRequest = await CompanyRequest.findById(req.params.id);
    res.status(200).json({success:true,data:companyRequest});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get company request sender user
export const getCompanyUserRequest = async (req, res) => {
  try {
    const userRequest = await User.findById(req.params.id);
    res.status(200).json({success:true,data:userRequest});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get company request sender user
export const acceptCompanyRequest = async (req, res) => {
  try {
    const companyRequest = await CompanyRequest.findById(req.params.id);
    if(!companyRequest) return  res.status(400).json({ message: "request not found" });
    const requestData = _.pick(companyRequest,["name","logo","address","phoneNo"])
    const createOwner = new Owner(requestData)
    const saverOwner = await createOwner.save()
    const updatedCompanyRequest = await CompanyRequest.findByIdAndUpdate(req.params.id,{
      isApproved:true
  },{new:true})

      const userCompany = await User.findOneAndUpdate(
        {_id:req.body.userId},
        { companyId: saverOwner.companyId,hasCompany:true },
        { new: true }
      );

    res.status(200).json({message:"success",owner:saverOwner,request:updatedCompanyRequest,user:userCompany});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete request

export const deleteCompanyRequest= async (req, res) => {
  try {
    await CompanyRequest.findByIdAndDelete(req.params.id)
    res.status(200).json("Company Request deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


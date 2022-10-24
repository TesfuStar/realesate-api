import Agent from "../Models/Agent.js";
import Property from "../Models/Property.js";
import Owner from "../Models/Owner.js";
import User from "../Models/User.js";
import AdBanner from "../Models/AdBanner.js";
import PropertyAd from "../Models/PropertyAd.js";
import SoldProperties from "../Models/SoldProperties.js";
//admin dashboard get total for all
import AgentCompany from "../Models/AgentCompany.js";
export const adminDashboard = async (req, res) => {
  try {
    const properties = await Property.find().count();
    const soldProperties = await Property.find({ isSoldOut: true }).count();
    const rentedProperties = await Property.find({ isRented: true }).count();
    const featuredProperties = await Property.find({
      isFeatured: true,
    }).count();
    const banners = await AdBanner.find({ isAccepted: true }).count();
    const agentCompanies = await AgentCompany.find().count();
    const agents = await Agent.find().count();
    const users = await User.find().count();
    res.status(200).json({
      message: "success",
      data: {
        totalProperties: properties,
        totalCompanies: agentCompanies,
        totalAgent: agents,
        totalUsers: users,
        totalRentedProperties: rentedProperties,
        totalSoldProperties: soldProperties,
        totalFeaturedProperties: featuredProperties,
        banners: banners,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all users

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all Agents

export const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: agents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all companies

export const getAllCompanies = async (req, res) => {
  try {
    const agentCompany = await AgentCompany.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: agentCompany });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete company
export const deleteCompany = async (req, res) => {
  try {
    const agentCompany = await AgentCompany.findById(req.params.id);
    if (!agentCompany)
      return res.status(404).json({ message: "agent company not found" });
    await Agent.deleteMany({ companyId: agentCompany.companyId });
    await SoldProperties.deleteMany({ companyId: agentCompany.companyId });
    await Property.deleteMany({ companyId: agentCompany.companyId });
    await PropertyAd.deleteMany({ companyId: agentCompany.companyId });
    await AgentCompany.findByIdAndDelete(req.params.id);
    await User.findOneAndUpdate(
      { companyId: agentCompany.companyId },
      { companyId: null, hasCompany: false, status: null },
      {new:true}
    );
    res
      .status(200)
      .json("Agent Company and all related things are deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all properties

export const getAllProperties = async (req, res) => {
  try {
    const property = await Property.find()
      .populate("owner")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get company Detail

export const getCompanyDetail = async (req, res) => {
  try {
    const agentCompany = await AgentCompany.findOne({
      companyId: req.params.id,
    });
    const rentalProperties = await Property.find({
      companyId: req.params.id,
      type: "rent",
    }).count();
    const sellProperties = await Property.find({
      companyId: req.params.id,
      type: "sell",
    }).count();
    const agents = await Agent.find({ companyId: req.params.id }).count();
    const rentedProperty = await Property.find({
      companyId: req.params.id,
      isRented: true,
    }).count();
    const soldProperty = await Property.find({
      companyId: req.params.id,
      isSoldOut: true,
    }).count();
    const adProperty = await Property.find({
      companyId: req.params.id,
      isFeatured: true,
    }).count();
    const allProperties = await Property.find({
      companyId: req.params.id,
    }).sort({ createdAt: -1 });
    const allAgents = await Agent.find({ companyId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      data: {
        owner: agentCompany,
        rentProperties: rentalProperties,
        sellProperties: sellProperties,
        agents: agents,
        properties: allProperties,
        allAgents: allAgents,
        soldProperty: soldProperty,
        rentedProperty: rentedProperty,
        adProperty: adProperty,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 1000 37 63 85 508

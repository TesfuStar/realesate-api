import Agent from "../Models/Agent.js";
import Property from "../Models/Property.js";
import Owner from "../Models/Owner.js";
import User from "../Models/User.js";
//admin dashboard get total for all

export const adminDashboard = async (req, res) => {
  try {
    const properties = await Property.find().count();
    const owners = await Owner.find().count();
    const agents = await Agent.find().count();
    const users = await User.find().count();
    res.status(200).json({
      message: "success",
      data: {
        totalProperties: properties,
        totalCompanies: owners,
        totalAgent: agents,
        totalUsers: users,
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
    const owners = await Owner.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: owners });
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
    await Owner.findByIdAndDelete(req.params.id);
    res.status(200).json("company deleted successfully");
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
    const rentalProperties = await Property.find({
      companyId: req.params.id,
      type: "rent",
    }).count();
    const sellProperties = await Property.find({
      companyId: req.params.id,
      type: "sell",
    }).count();
    const agents = await Agent.find({ companyId: req.params.id }).count();
    const allProperties = await Property.find({companyId: req.params.id,}).sort({createdAt:-1})
    const allAgents = await Agent.find({companyId: req.params.id,}).sort({createdAt:-1})
    res.status(200).json({
      success: true,
      data: { rentProperties: rentalProperties, 
        sellProperties: sellProperties,
         agents: agents,
         properties:allProperties,
         allAgents:allAgents },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

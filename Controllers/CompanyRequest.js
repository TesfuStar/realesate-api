import CompanyRequest from "../Models/CompanyRequest.js";
import User from "../Models/User.js";
import AgentCompany from "../Models/AgentCompany.js";
import Agent from "../Models/Agent.js";
import Notification from "../Models/Notification.js";
import _ from "lodash";
export const createCompanyRequest = async (req, res) => {
  const newCompanyRequest = new CompanyRequest(req.body);
  try {
    const oldRequest = await CompanyRequest.findOne({
      _id: newCompanyRequest._id,
    });
    if (oldRequest) {
      const oldRequest = await CompanyRequest.findOneAndUpdate(
        { _id: newCompanyRequest._id },
        { $set: req.body },
        { new: true }
      );
      const notifiedUser = await User.findOne({ isAdmin: true });
      const requestNotification = new Notification({
        userId: notifiedUser._id,
        title: "Agent company request",
        message: `You have new Agent Company request from ${oldRequest?.name}`,
      });
      const saveRequestNotification = await requestNotification.save();
      const requestUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { status: "Pending" },
        { new: true }
      );
      res.status(201).json({
        success: true,
        data: oldRequest,
        user: requestUser,
        notification: saveRequestNotification,
      });
      return;
    }
    const oldPhone = await CompanyRequest.findOne({ phone: req.body.phone });
    if (oldPhone)
      return res.status(400).json({ message: "phone already in use" });
    const oldEmail = await CompanyRequest.findOne({ email: req.body.email });
    if (oldEmail)
      return res.status(400).json({ message: "Email already in use" });
    const oldName = await CompanyRequest.findOne({ name: req.body.name });
    if (oldName)
      return res
        .status(400)
        .json({ message: "this real estate already exist" });
    const savedCompanyRequest = await newCompanyRequest.save();
    const notifiedUser = await User.findOne({ isAdmin: true });
    const requestNotification = new Notification({
      userId: notifiedUser._id,
      title: "Agent company request",
      message: `You have new Agent Company request from ${savedCompanyRequest?.name}`,
    });
    const saveRequestNotification = await requestNotification.save();
    const requestUser = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { status: "Pending" },
      { new: true }
    );
    res.status(201).json({
      success: true,
      data: savedCompanyRequest,
      user: requestUser,
      notification: saveRequestNotification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//landing profile
export const userLandingProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const company = await CompanyRequest.findOne({ userId: req.params.id });
    res
      .status(200)
      .json({ success: true, data: { user: user, company: company } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all company request

export const getAllCompanyRequest = async (req, res) => {
  try {
    const allCompanyRequest = await CompanyRequest.find({
      isApproved: false,
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: allCompanyRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all Accepted company request

export const getAllAcceptedCompanyRequest = async (req, res) => {
  try {
    const allCompanyRequest = await CompanyRequest.find({
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: allCompanyRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get Single(Detail) company request

export const getSingleCompanyRequest = async (req, res) => {
  try {
    const companyRequest = await CompanyRequest.findById(req.params.id);
    const requestSender = await User.findById(req.params.id);
    res
      .status(200)
      .json({ success: true, data: companyRequest, user: requestSender });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get company request sender user
export const getCompanyUserRequest = async (req, res) => {
  try {
    const userRequest = await User.findById(req.params.id);
    res.status(200).json({ success: true, data: userRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//accept agents company request
export const acceptCompanyRequest = async (req, res) => {
  try {
    const companyRequest = await CompanyRequest.findById(req.params.id);
    if (!companyRequest)
      return res.status(400).json({ message: "request not found" });
    const requestData = _.pick(companyRequest, [
      "name",
      "logo",
      "address",
      "phone",
    ]);
    const createAgentCompany = new AgentCompany(requestData);
    const savedAgentCompany = await createAgentCompany.save();
    const updatedCompanyRequest = await CompanyRequest.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: true,
        status: "Approved",
      },
      { new: true }
    );

    const userCompany = await User.findByIdAndUpdate(
      req.params.id,
      {
        companyId: savedAgentCompany.companyId,
        hasCompany: true,
        status: "Accepted",
      },
      { new: true }
    );
    const acceptanceNotification = new Notification({
      companyId: savedAgentCompany.companyId,
      title: "Company Request",
      message: "your request is accepted",
    });
    const saveAcceptanceNotification = await acceptanceNotification.save();
    const agentData = _.pick(userCompany, [
      "companyId",
      "firstName",
      "lastName",
      "phone",
      "email",
      "hasCompany",
    ]);
    const createAgent = new Agent(agentData);
    const savedAgent = await createAgent.save();
    res.status(200).json({
      message: "success",
      AgentCompany: savedAgentCompany,
      request: updatedCompanyRequest,
      user: userCompany,
      agent: savedAgent,
      notification: saveAcceptanceNotification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete request

export const rejectCompanyRequest = async (req, res) => {
  try {
    await CompanyRequest.findByIdAndDelete(req.params.id);
    const requestSenderUser = await User.findByIdAndUpdate(
      req.params.id,
      { status: null },
      { new: true }
    );

    res
      .status(200)
      .json({
        message: "Company Request deleted successfully",
        user: requestSenderUser,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

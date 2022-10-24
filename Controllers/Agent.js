import Agent from "../Models/Agent.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "@hapi/joi";
//create Agent

export const createAgent = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      companyId: Joi.string().required(),
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      profile:Joi.string().optional(),
      phone:Joi.array().items(Joi.string().min(1)),
      email: Joi.string().email().lowercase().allow('').optional(),
    });
    const joeResult = await schema.validateAsync(req.body);
    if (joeResult.error)
    return res
      .status(400)
      .json({ message: joeResult.error.details[0].message });

  let oldEmail = await Agent.findOne({ email: joeResult.email });

  let oldPhone = await Agent.findOne({ phone: joeResult.phone[0] || joeResult.phone[1] || joeResult.phone[2] });
  if (oldEmail)
    return res.status(400).json({ message: "email already in use" });
  if (oldPhone) return res.status(400).json({ message: "phone already in use" });
  const result = await Agent.create({
    companyId:joeResult.companyId,
    email:joeResult.profile ? joeResult.email :"",
    phone:joeResult.phone,
    profile:joeResult.profile ? joeResult.profile : "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    firstName: joeResult.firstName,
    lastName: joeResult.lastName,
  });
   res.status(201).json({success:true,data:result});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get Agents

export const getAllAgents = async (req, res) => {
  try {
    const allAgents = await Agent.find();
    res.status(200).json(allAgents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get single Agent
export const getSingleAgent = async (req, res) => {
    try {
      const agent = await Agent.findById(req.params.id)
      if(!agent) return res.status(404).json({ message: "agent not found" });

      res.status(200).json({message:true,data:agent});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  //delete agent

  export const deleteSingleAgent= async (req, res) => {
    try {
      await Agent.findByIdAndDelete(req.params.id)
      res.status(200).json("Agent deleted successfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //update agent
  export const updateAgent= async (req, res) => {
    try {
      const agent = await Agent.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
      res.status(200).json(agent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

    //getCompanies agent
    export const getCompanyAgent= async (req, res) => {
      try {
        const companyAgent = await Agent.find({companyId:req.params.companyId})
        res.status(200).json(companyAgent);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };


      //delete companies agent deleting compnies their agent

  export const deleteCompanyAgent= async (req, res) => {
    try {
      const oldAgent = await Agent.findById(req.params.id)
      if(!oldAgent) return  res.status(400).json({ message: "agent not found" });
      await Agent.findByIdAndDelete(req.params.id)
      res.status(200).json("Agent deleted successfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

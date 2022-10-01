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
      phone:Joi.number().optional(),
      email: Joi.string().email().lowercase().allow('').optional(),
    });
    const joeResult = await schema.validateAsync(req.body);
    if (joeResult.error)
    return res
      .status(400)
      .json({ message: joeResult.error.details[0].message });

  let oldEmail = await Agent.findOne({ email: joeResult.email });

  if (oldEmail)
    return res.status(400).json({ message: "email already in use" });
    let oldPhone = await Agent.findOne({ email: joeResult.phone });
  if (oldPhone) return res.status(400).json({ message: "phone already in use" });
  const result = await Agent.create({
    companyId:joeResult.companyId,
    email: joeResult.email,
    phone:joeResult.phone,
    firstName: joeResult.firstName,
    lastName: joeResult.lastName,
  });
   res.status(201).json(result);
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
      res.status(200).json(agent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  //delete agent

  export const deleteSingleAgent= async (req, res) => {
    try {
      await Agent.findByIdAndDelete(req.params.id)
      res.status(200).json("Agent deleted succssfully");
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

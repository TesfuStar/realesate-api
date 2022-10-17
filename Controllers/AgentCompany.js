import AgentCompany from "../Models/AgentCompany.js";

//create agent(company)

export const createAgentCompany = async (req, res) => {
  try {
    const findPhone = await AgentCompany.findOne({phone:req.body.phone})
    if(findPhone) return res.status(400).json({message:"phone number already in use"})
    const newAgentCompany = new AgentCompany(req.body);
    const savedAgentCompany = await newAgentCompany.save();
    res.status(201).json({success:true,data:savedAgentCompany});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get AgentCompany

export const getAllAgentCompany = async (req, res) => {
  try {
    const allAgentCompany = await AgentCompany.find();
    res.status(200).json({success:true,data:allAgentCompany});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get single AgentCompany
export const getSingleAgentCompany = async (req, res) => {
    try {
      const singleAgentCompany = await AgentCompany.findById(req.params.id)
      res.status(200).json({success:true,data:singleAgentCompany});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  //delete AgentCompany

  export const deleteAgentCompany= async (req, res) => {
    try {
      await AgentCompany.findByIdAndDelete(req.params.id)
      res.status(200).json({success:true,message:"owner deleted successfully"});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //update AgentCompany
  export const updateAgentCompany= async (req, res) => {
    try {
      const updatedAgentCompany = await AgentCompany.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
      res.status(200).json({success:true,data:updatedAgentCompany});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



  //get own company information
  export const getOwnAgentCompanyInformation= async (req, res) => {
    try {
      const agentCompany = await AgentCompany.findOne({companyId:req.params.companyId})
      if(!agentCompany) return res.status(400).json({message:"company not found"})
      res.status(200).json({success:true,data:agentCompany});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



  //update own company information
  export const updateCompanyInformation = async (req, res) => {
 
    try {
      const company = await AgentCompany.findOne({companyId:req.params.companyId})
      if(!company) return res.status(400).json({message:"company not found"})
      const updatedCompany = await AgentCompany.findOneAndUpdate(
        {companyId:req.params.companyId},
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json({success:true,data:updatedCompany});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
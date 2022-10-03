import AgentCompany from "../Models/AgentCompany.js";

//create agent(company)

export const createAgentCompany = async (req, res) => {
  const newAgentCompany = new AgentCompany(req.body);
  try {
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
      const singleAgentCompany = await AgentCompany.AgentCompany(req.params.id)
      res.status(200).json({success:true,data:singleAgentCompany});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  //delete AgentCompany

  export const deleteAgentCompany= async (req, res) => {
    try {
      await AgentCompany.findByIdAndDelete(req.params.id)
      res.status(200).json({success:true,message:"owner deleted succssfully"});
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
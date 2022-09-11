import Agent from "../Models/Agent.js";

//create Agent

export const createAgent = async (req, res) => {
  const newAgent = new Agent(req.body);
  try {
    const savedAgent = await newAgent.save();
    res.status(201).json(savedAgent);
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

    //update agent
    export const getCompanyAgent= async (req, res) => {
      try {
        const companyAgent = await Agent.find({companyId:req.params.companyId})
        res.status(200).json(companyAgent);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
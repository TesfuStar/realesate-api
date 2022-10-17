import Owner from "../Models/Owner.js";

//create owner(company)

export const createOwner = async (req, res) => {
  const newCompany = new Owner(req.body);
  try {
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get owners

export const getAllOwners = async (req, res) => {
  try {
    const allOwners = await Owner.find();
    res.status(200).json(allOwners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get single company
export const getSingleCompany = async (req, res) => {
    try {
      const owner = await Owner.findById(req.params.id)
      res.status(200).json({message:true,data:owner});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  //delete owner

  export const deleteSingleOwner= async (req, res) => {
    try {
      await Owner.findByIdAndDelete(req.params.id)
      res.status(200).json("owner deleted succssfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //update owner
  export const updateOwner= async (req, res) => {
    try {
      const owner = await Owner.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
      res.status(200).json(owner);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
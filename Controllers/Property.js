import Property from "../Models/Property.js";

//create all property

export const createProperty = async (req, res) => {
  const newProperty = new Property(req.body);
  try {
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all property

export const getAllProperty = async (req, res) => {
  try {
    const allProperties= await Property.find();
    res.status(200).json(allProperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get single property
export const getSingleProperty = async (req, res) => {
    try {
      const property = await Property.findById(req.params.id)
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  //delete property

  export const deleteProperty= async (req, res) => {
    try {
      await Property.findByIdAndDelete(req.params.id)
      res.status(200).json("owner deleted succssfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //update property
  export const updateProperty= async (req, res) => {
    try {
      const property = await Property.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
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
  const options = {
    page: req.query.page,
    populate: 'agents',
    sort:{updatedAt:-1},

    limit: 2,
    collation: {
      locale: "en",
    },
  };
  

  try {
    const allProperties = await Property.paginate(
      {isRented:false,isSoldOut:false},
      options,
      function (err, result) {
  
        res.status(200).json(result);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single property
export const getSingleProperty = async (req, res) => {
  try {
    const singleProperty = await Property.findById(req.params.id).populate("agents").populate("owner")
    if(!singleProperty) return res.status(404).json({ message: "property  not found" });
    singleProperty.views++;
    const savedProperty = await singleProperty.save()
     res.status(200).json({success:true,data:savedProperty})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//get single property forDashboard to remove view counter
export const getSinglePropertyDashboard = async (req, res) => {
  try {
    const singleProperty = await Property.findById(req.params.id).populate("agents");
    if(!singleProperty) return res.status(404).json({ message: "property  not found" });
     res.status(200).json({success:true,data:singleProperty})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete property

export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json("property deleted succssfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({success:true,data:property});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//filtered properties

export const getPropertiesByFilter = async (req, res) => {
  const {
    minprice,
    maxprice,
    bathroom,
    bedroom,
    minarea,
    maxarea,
    type,
    city,
    owner,
  } = req.query;
  try {
    const property = await Property.find({
      price: { $gte: minprice | 100, $lte: maxprice || 20000000 },
      "details.bedroom": { $gte: bedroom | 1 },
      "details.bathroom": { $gte: bathroom | 1 },
      "details.area": { $gte: minarea | 100, $lte: maxarea || 10000 },
      type: type ? { $in: [type] } : { $in: ["sale", "rent"] },
      owner: owner ? { $eq: owner } : { $exists: true },
      "address.city": city ? { $in: [city] } : { $exists: true },
    });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get property sell or rent
export const getByPropertyType = async (req, res) => {
  const qPropertyType = req.query.type;
  let properties;
  const queryText = new RegExp(qPropertyType, "i");
  try {
    properties = await Property.find({
      type: {
        $in: [queryText],
      },
    }).populate("agents");
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all properties or by realstate owner

export const getPropertyByOwner = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.params.id });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get company property
export const getCompaniesProperty=async(req,res)=>{
  try {
    const companyProperty = await Property.find({companyId:req.params.companyId,isSoldOut:false,isRented:false}).sort({updatedAt:-1})
    res.status(200).json({success:true,message:'success',data:companyProperty});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


//get featured property
export const getFeaturedProperty = async (req, res) => {
  try {
    const properties = await Property.find({ isFeatured:true }).populate('agents');
    res.status(200).json({success:true,data:properties});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get property by mostly viewed
export const getMostlyViewedProperty = async (req, res) => {
  try {
    const properties = await Property.find().populate('agents').sort({views:-1})
    res.status(200).json({success:true,data:properties});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//get companies featured properties
export const getCompaniesFeaturedProperty=async(req,res)=>{
  try {
    const companyProperty = await Property.find({companyId:req.params.companyId,isFeatured:true})
    res.status(200).json({success:true,message:'success',data:companyProperty});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//get companies featured properties
export const getCompaniesUnadvertisedProperty=async(req,res)=>{
  try {
    const companyProperty = await Property.find({companyId:req.params.companyId,isFeatured:false})
    res.status(200).json({success:true,message:'success',data:companyProperty});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

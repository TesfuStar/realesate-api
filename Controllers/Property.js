import Property from "../Models/Property.js";
import AgentCompany from "../Models/AgentCompany.js";
import Comment from "../Models/Comment.js";
import PropertyAd from "../Models/PropertyAd.js";
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
    populate: "agents",
    sort: { createdAt: -1 },

    limit: 2,
    collation: {
      locale: "en",
    },
  };

  try {
    const allProperties = await Property.paginate(
      { isRented: false, isSoldOut: false,isHided:false },
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
    const singleProperty = await Property.findById(req.params.id)
      .populate("agents")
      .populate("owner");
    if (!singleProperty)
      return res.status(404).json({ message: "property  not found" });
    singleProperty.views++;
    const lat = singleProperty.address.loc[1];
    const long = singleProperty.address.loc[0];
    const relatedProperty = await Property.find({isSoldOut:false,isRented:false,isHided:false,
      "address.loc": {
        $near: {
          $geometry: { type: "Point", coordinates: [long, lat] },
          $minDistance: 50,
          $maxDistance: 50000,
        },
      },
    });
    const agentCompany = await AgentCompany.findOne({companyId:singleProperty.companyId})
    const savedProperty = await singleProperty.save();
    res
      .status(200)
      .json({ success: true, data: savedProperty, related: relatedProperty,agentCompany:agentCompany.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single property forDashboard to remove view counter
export const getSinglePropertyDashboard = async (req, res) => {
  try {
    const singleProperty = await Property.findById(req.params.id)
      .populate("agents")
      .populate("owner");
    console.log(singleProperty);
    if (!singleProperty)
      return res.status(404).json({ message: "property  not found" });
    const agentPoster = await AgentCompany.findOne({
      companyId: singleProperty.companyId,
    });
    const agentComment = await Comment.find({
      agent: singleProperty.agents._id,
    }).populate("user");

    res.status(200).json({
      success: true,
      data: singleProperty,
      poster: agentPoster,
      comments: agentComment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete property

export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    const isAd = PropertyAd.findById(req.params.id);
    if (isAd) {
      await PropertyAd.findByIdAndDelete(req.params.id);
    }
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
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update property to hide property
export const updatePropertyToHide = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        isHided: true,
      },
      { new: true }
    );
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update property to unHide property
export const updatePropertyToUnHide = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      {
        isHided: false,
      },
      { new: true }
    );
    res.status(200).json({ success: true, data: property });
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
    const property = await Property.find({isSoldOut:false,isRented:false,
      price: { $gte: minprice | 0, $lte: maxprice || 20000000 },
      "details.bedroom": { $gte: bedroom | 0 },
      "details.bathroom": { $gte: bathroom | 0 },
      "details.area": { $gte: minarea | 0, $lte: maxarea || 10000 },
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
      },isHided:false,isSoldOut:false,isRented:false
    }).populate("agents");
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all properties or by reale-state owner

export const getPropertyByOwner = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.params.id });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get company property
export const getCompaniesProperty = async (req, res) => {
  try {
    const companyProperty = await Property.find({
      companyId: req.params.companyId,
      isSoldOut: false,
      isRented: false,
    }).sort({ updatedAt: -1 });
    res
      .status(200)
      .json({ success: true,  data: companyProperty });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get featured property
export const getFeaturedProperty = async (req, res) => {
  try {
    const properties = await Property.find({ isFeatured: true })
      .populate("agents")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get company featured property for company dashboard
export const getOwnFeaturedProperty = async (req, res) => {
  try {
    const properties = await Property.find({
      companyId: req.params.companyId,
      isFeatured: true,
    }).populate("agents");
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get property by mostly viewed
export const getMostlyViewedProperty = async (req, res) => {
  try {
    const properties = await Property.find({isHided:false,isSoldOut:false,isRented:false})
      .populate("agents")
      .sort({ views: -1 });
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get companies featured properties
export const getCompaniesFeaturedProperty = async (req, res) => {
  try {
    const companyProperty = await Property.find({
      companyId: req.params.companyId,
      isFeatured: true,
    });
    res
      .status(200)
      .json({ success: true, message: "success", data: companyProperty });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get companies featured properties
export const getCompaniesUnadvertisedProperty = async (req, res) => {
  try {
    const companyProperty = await Property.find({
      companyId: req.params.companyId,
      isFeatured: false,
      isSoldOut: false,
      isRented: false,
      isRequestedForAd: false,
    });
    res
      .status(200)
      .json({ success: true, message: "success", data: companyProperty });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all property of agentCompany for app

export const getAllAgentCompanyProperty = async (req, res) => {
  try {
    const agentProperties = await Property.find({
      companyId: req.params.companyId,
      isSoldOut: false,
      isRented: false,
      isHided:false
    });
    res.status(200).json({success:true,data:agentProperties})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

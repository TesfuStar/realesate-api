import PropertyAd from "../Models/PropertyAd.js";
import Notification from "../Models/Notification.js";
import Property from "../Models/Property.js";
import _ from "lodash";
//create property ads
export const createPropertyAd = async (req, res) => {
  const newPropertyAd = new PropertyAd(req.body);
  try {
    const savedPropertyAd = await newPropertyAd.save();
    res.status(201).json({ success: true, data: savedPropertyAd });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//accept property ads
export const acceptPropertyAds = async (req, res) => {
  const companyAd = await PropertyAd.findById(req.params.id);
  if (!companyAd)
    return res.status(400).json({ message: "request Ad not found" });
  const updatedCompanyAd = await PropertyAd.findByIdAndUpdate(
    req.params.id,
    {
      isAccepted: true,
      isFeatured: true,
    },
    { new: true }
  );
  const requestAdData = _.pick(updatedCompanyAd, [
    "companyId",
    "name",
    "images",
    "price",
    "description",
    "type",
    "details",
    "owner",
    "agents",
    "address",
    "isFeatured",
  ]);
  const createProperty = new Property(requestAdData);
  const savedProperty = await createProperty.save();
  res.status(200).json({
    message: "success",
    property: savedProperty,
    requestAd: updatedCompanyAd,
  });
};

//get company request property ads
export const getCompanyRequestAds = async (req, res) => {
  try {
    const companyAdsRequest = await PropertyAd.find({
      companyId: req.params.companyId,
      isAccepted: false,
    }).sort({updatedAt:-1});
    res
      .status(200)
      .json({ success: true, message: "success", data: companyAdsRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all add request
export const getAllCompanyRequestAds = async (req, res) => {
  try {
    const allAdsRequest = await PropertyAd.find({ isAccepted: false }).sort({updatedAt:-1});
    res
      .status(200)
      .json({ success: true, message: "success", data: allAdsRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get accepted ad request
export const getAcceptedCompanyRequestAds = async (req, res) => {
  try {
    const acceptedAdsRequest = await PropertyAd.find({
      isAccepted: true,
      isFeatured: true,
    }).populate('owner');
    res
      .status(200)
      .json({ success: true, message: "success", data: acceptedAdsRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single Ad request
export const getSingleAdProperty = async (req, res) => {
  try {
    const singleAdProperty = await PropertyAd.findById(req.params.id).populate("agents");
    // .populate("agents");
     if(!singleAdProperty) return res.status(404).json({ message: "property ad not found" });
     
     res.status(200).json({success:true,data:singleAdProperty,message:"found"})
     console.log(singleAdProperty)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
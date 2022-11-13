import PropertyAd from "../Models/PropertyAd.js";
import Notification from "../Models/Notification.js";
import Property from "../Models/Property.js";
import _ from "lodash";
import User from "../Models/User.js";
import AgentCompany from "../Models/AgentCompany.js";
import Comment from "../Models/Comment.js";
//create property ads
export const createPropertyAd = async (req, res) => {
  const newPropertyAd = new PropertyAd(req.body);
  try {
    const isBeforeInPropertyAd = await PropertyAd.findOne({_id:req.body._id})
    const notifiedUser = await User.findOne({ isAdmin: true });
    if(isBeforeInPropertyAd){
     const updatedPropertyAd =  await PropertyAd.findOneAndUpdate(req.body._id,{isRejected:false},{new:true})
      const requestNotification = new Notification({
        userId: notifiedUser._id,
        title: "property Ad request",
        message: `You have new Property Ad request`,
      });
      const saveRequestNotification = await requestNotification.save();
      res
        .status(201)
        .json({
          success: true,
          data: updatedPropertyAd,
          notification: saveRequestNotification,
        });
      return ;
    }
    const savedPropertyAd = await newPropertyAd.save();
    const isBeforeExisted = await Property.findOne({_id:savedPropertyAd._id})
    console.log("isBeforeExisted")
    if(isBeforeExisted){
        await Property.findOneAndUpdate(
        {_id:savedPropertyAd._id},
        {
          isRequestedForAd:true
        },
        { new: true }
      );
    }
    const requestNotification = new Notification({
      userId: notifiedUser._id,
      title: "property Ad request",
      message: `You have new Property Ad request`,
    });
    const saveRequestNotification = await requestNotification.save();
    res
      .status(201)
      .json({
        success: true,
        data: savedPropertyAd,
        notification: saveRequestNotification,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//accept property ads
export const acceptPropertyAds = async (req, res) => {
  try {
    const companyAd = await PropertyAd.findById(req.params.id);
    if (!companyAd)
      return res.status(400).json({ message: "request Ad not found" });
    const isExisted = await Property.findById(req.params.id);
    const updatedCompanyAd = await PropertyAd.findByIdAndUpdate(
      req.params.id,
      {
        isAccepted: true,
        isFeatured: true,
      },
      { new: true }
    );
    if (isExisted) {
      const updatedProperty = await Property.findByIdAndUpdate(
        req.params.id,
        {
          isFeatured: true,
        },
        { new: true }
      );
      const propertyAdNotification = new Notification({
        companyId: updatedProperty.companyId,
        title: "Property ads",
        message: "congra your Ad request is is accepted",
      });
      const savePropertyAdNotification = await propertyAdNotification.save();
      res.status(200).json({
        message: "success",
        property: updatedProperty,
        requestAd: updatedCompanyAd,
        notification: savePropertyAdNotification,
      });
    } else {
      const requestAdData = _.pick(updatedCompanyAd, [
        "companyId",
        "name",
        "images",
        "price",
        "description",
        "paymentDescription",
        "type",
        "details",
        "owner",
        "agents",
        "address",
        "isFeatured",
        "amenities",
      ]);
      const createProperty = new Property(requestAdData);
      const savedProperty = await createProperty.save();
      const propertyAdNotification = new Notification({
        companyId: savedProperty.companyId,
        title: "Property ads",
        message: "congra your Ad request is is accepted",
      });
      const savePropertyAdNotification = await propertyAdNotification.save();
      res.status(200).json({
        message: "success",
        property: savedProperty,
        requestAd: updatedCompanyAd,
        notification: savePropertyAdNotification,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//reject property ads request

export const rejectPropertyAds = async (req, res) => {
  try {
    const companyAd = await PropertyAd.findById(req.params.id);
    const isExisted = await Property.findById(req.params.id);
    if (!companyAd)
      return res.status(400).json({ message: "request Ad not found" });
    
    if(isExisted){
      await Property.findByIdAndUpdate(req.params.id,{isRequestedForAd:false},{new:true})
    }
    await PropertyAd.findByIdAndUpdate(req.params.id,{isRejected:true},{new:true});
    const propertyAdNotification = new Notification({
      companyId: companyAd.companyId,
      title:"Property Ad request",
      message: "your Ads request is rejected",
    });
    const savePropertyAdNotification = await propertyAdNotification.save();
    res.status(200).json({
      success: true,
      message: "success",
      notification: savePropertyAdNotification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get company request property ads
export const getCompanyRequestAds = async (req, res) => {
  try {
    const companyAdsRequest = await PropertyAd.find({
      companyId: req.params.companyId,
      isAccepted: false,
      isRejected:false
    }).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, message: "success", data: companyAdsRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get own rejected ads

export const getCompanyRejectedRequestAds=async(req,res)=>{
  try {
    const companyAdsRequest = await PropertyAd.find({
      companyId: req.params.companyId,
      isAccepted: false,
      isRejected:true,
      isFeatured:false
    }).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, message: "success", data: companyAdsRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get all add request
export const getAllCompanyRequestAds = async (req, res) => {
  try {
    const allAdsRequest = await PropertyAd.find({ isAccepted: false,isRejected:false }).sort({
      createdAt: -1,
    });
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
    }).populate("owner");
    res
      .status(200)
      .json({ success: true, message: "success", data: acceptedAdsRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//get all rejected
export const getAllRejectedCompanyRequestAds=async(req,res)=>{
  try {
    const rejectedAdsRequest = await PropertyAd.find({
      isAccepted: false,
      isFeatured: false,
      isRejected:true
    }).populate("owner");
    res
      .status(200)
      .json({ success: true, message: "success", data: rejectedAdsRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get single Ad request
export const getSingleAdProperty = async (req, res) => {
  try {
    const singleAdProperty = await PropertyAd.findById(req.params.id).populate("agents")
    .populate("owner");
    // .populate("agents");
    if (!singleAdProperty)
      return res.status(404).json({ message: "property ad not found" });
      const agentPoster = await AgentCompany.findOne({
        companyId: singleAdProperty.companyId,
      });
      const agentComment = await Comment.find({
        agent: singleAdProperty.agents._id,
      }).populate("user");
    res
      .status(200)
      .json({ success: true, data: singleAdProperty, poster: agentPoster,  comments: agentComment, });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get my ad request for company
//get company request property ads
export const getOwnCompanyRequestAds = async (req, res) => {
  try {
    const companyAdsRequest = await PropertyAd.find({
      companyId: req.params.companyId,
      isAccepted: false,
    }).sort({ updatedAt: -1 });
    res
      .status(200)
      .json({ success: true, message: "success", data: companyAdsRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//delete own property ad request
export const deletePropertyAdRequest = async (req, res) => {
  try {
    await PropertyAd.findByIdAndDelete(req.params.id);
    res.status(200).json("property ad request deleted succssfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update propertyad request
export const updatePropertyAdRequest = async (req, res) => {
  try {
    const property = await PropertyAd.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const isAlsoProperty  = await Property.findOne({_id:property._id})
    if(isAlsoProperty){
      await Property.findOneAndUpdate(
        {_id:property._id},
        {
          $set: req.body,
        },
        { new: true }
      );
    }
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import AdBanner from "../Models/AdBanner.js";
import Notification from "../Models/Notification.js";
import User from "../Models/User.js";
import AgentCompany from "../Models/AgentCompany.js";
//request ad banner
export const postAdBanner = async (req, res) => {
  const bannerAds = new AdBanner(req.body);
  try {
    const savedBannerAd = await bannerAds.save();
    const notifiedUser = await User.findOne({ isAdmin: true });
    const newAdRequestNotification = new Notification({
      userId: notifiedUser._id,
      title: "Ads Banner request",
      message: `Your have new ads banner request`,
    });
    const saveAdRequestNotification = await newAdRequestNotification.save();
    res.status(201).json({
      success: true,
      data: savedBannerAd,
      notification: saveAdRequestNotification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get own banner ads request unaccepted

export const getOwnCompanyRequestAds = async (req, res) => {
  try {
    const agentCompanyBannerAds = await AdBanner.find({
      AgentCompany: req.params.companyId,
      isAccepted: false,
    })
      .populate("owner")
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, message: "success", data: agentCompanyBannerAds });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get accepted request ads
export const getOwnCompanyAcceptedAds = async (req, res) => {
  try {
    const agentCompanyAcceptedBannerAds = await AdBanner.find({
      AgentCompanyId: req.params.companyId,
      isAccepted: true,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "success",
      data: agentCompanyAcceptedBannerAds,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//accept company banner ads

export const acceptCompanyBannerAds = async (req, res) => {
  try {
    const bannerAd = await AdBanner.findById(req.params.id);
    if (!bannerAd)
      return res.status(404).json({
        message: "bannerAd not found",
      });
    const getBannerAd = await AdBanner.findByIdAndUpdate(
      req.params.id,
      {
        isAccepted: true,
      },
      { new: true }
    );
    const acceptanceAdNotification = new Notification({
      companyId: getBannerAd.AgentCompany,
      title: "Ads Banner request",
      message: `Your ads banner request is accepted`,
    });
    const saveAdNotification = await acceptanceAdNotification.save();
    res.status(200).json({
      success: true,
      message: "success",
      data: getBannerAd,
      notification: saveAdNotification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get banner ads for app

export const getBannerAds = async (req, res) => {
  try {
    const bannerAds = await AdBanner.find({ isAccepted: true });
    res.status(200).json({
      success: true,
      data: bannerAds,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete banner
export const deleteOwnBanner = async (req, res) => {
  try {
    const banner = await AdBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "banner not found" });
    await AdBanner.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//edit banner
export const editOwnBanner = async (req, res) => {
  try {
    const banner = await AdBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "banner not found" });
    const updatedBanner = await AdBanner.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedBanner });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all unaccepted banner ads for admin
export const getAllCompanyRequestAds = async (req, res) => {
  try {
    const agentCompanyBannerAds = await AdBanner.find({
      isAccepted: false,
      isRejected: false,
    })
      .populate("owner")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ success: true, message: "success", data: agentCompanyBannerAds });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all accepted banner ads
export const getAllCompanyAcceptedBannerAds = async (req, res) => {
  try {
    const agentCompanyBannerAds = await AdBanner.find({
      isAccepted: true,
      isRejected: false,
    })
      .populate("owner")
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, message: "success", data: agentCompanyBannerAds });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single banner
export const getSingleBanner = async (req, res) => {
  try {
    const singleBanner = await AdBanner.findById(req.params.id).populate("owner");
    const agentCompany = await AgentCompany.findOne({companyId:singleBanner.AgentCompany})
    res
      .status(200)
      .json({ success: true, message: "success", data: singleBanner,company:agentCompany });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//reject banner ads
export const rejectCompanyBannerAds = async (req, res) => {
  try {
    const bannerAd = await AdBanner.findById(req.params.id);
    if (!bannerAd)
      return res.status(404).json({
        message: "bannerAd not found",
      });
    const getBannerAd = await AdBanner.findByIdAndDelete(req.params.id);
    const rejectAdNotification = new Notification({
      companyId: getBannerAd.AgentCompany,
      title: "Ads Banner request",
      message: `Your ads banner request is rejected contact us for mare information`,
    });
    const saveAdNotification = await rejectAdNotification.save();
    res.status(200).json({
      success: true,
      message: "success",
      data: getBannerAd,
      notification: saveAdNotification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
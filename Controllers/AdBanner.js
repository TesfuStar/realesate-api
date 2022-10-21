import AdBanner from "../Models/AdBanner.js";
import Notification from "../Models/Notification.js";
//request ad banner
export const postAdBanner = async (req, res) => {
  const bannerAds = new AdBanner(req.body);
  try {
    const savedBannerAd = await bannerAds.save();
    const newAdRequestNotification = new Notification({
      userId: req.body.userId,
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
      AgentCompanyId: req.params.companyId,
      isAccepted: false,
    }).sort({ createdAt: -1 });
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
      return ResizeObserverSize.status(404).json({
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
      companyId: getBannerAd.AgentCompanyId,
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

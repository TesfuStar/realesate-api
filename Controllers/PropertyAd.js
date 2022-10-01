import PropertyAd from '../Models/PropertyAd.js'
import Notification from '../Models/Notification.js'

//create property ads
export const createPropertyAd = async (req, res) => {
    const newPropertyAd = new PropertyAd(req.body);
    try {
      const savedPropertyAd = await newPropertyAd.save();
      res.status(201).json({success:true,data:savedPropertyAd});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };




//accept property ads
export const acceptPropertyAds=async(req,res)=>{

}

//get company request property ads
export const getCompanyRequestAds=async(req,res)=>{
    try {
        const companyAdsRequest = await PropertyAd.find({companyId:req.params.companyId,isAccepted:false})
        res.status(200).json({success:true,message:'success',data:companyAdsRequest});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}


//get all add request 
export const getAllCompanyRequestAds=async(req,res)=>{
  try {
      const allAdsRequest = await PropertyAd.find({isAccepted:false})
      res.status(200).json({success:true,message:'success',data:allAdsRequest});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
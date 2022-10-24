import express from "express";

const router = express.Router();

import {
  postAdBanner,
  getOwnCompanyRequestAds,
  getOwnCompanyAcceptedAds,
  acceptCompanyBannerAds,
  getBannerAds,
  deleteOwnBanner,
  editOwnBanner,
  getAllCompanyRequestAds,
  getAllCompanyAcceptedBannerAds,
  getSingleBanner,
  rejectCompanyBannerAds
} from "../Controllers/AdBanner.js";

router.post("/add", postAdBanner);
router.get("/company/find/:id", getSingleBanner); 
router.get("/company/unaccepted/:companyId", getOwnCompanyRequestAds); //unaccepted ads
router.get("/unaccepted/all", getAllCompanyRequestAds); //unaccepted ads all for admin
router.get("/accepted/all", getAllCompanyAcceptedBannerAds); //unaccepted ads all for admin
router.get("/company/accepted/:companyId", getOwnCompanyAcceptedAds);
router.get("/company/accept/:id", acceptCompanyBannerAds);
router.get("/company/reject/:id", rejectCompanyBannerAds);
router.put("/company/edit/:id", editOwnBanner);
router.delete("/company/delete/:id",deleteOwnBanner)
router.get("/app", getBannerAds);
export default router;

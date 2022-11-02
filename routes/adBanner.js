import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndCompanyAdmin,
  verifyTokenAndAuthorization,
} from "../Middleware/authorization.js";
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
  rejectCompanyBannerAds,
  getOwnRejectedCompanyRequestAds
} from "../Controllers/AdBanner.js";

router.post("/add",verifyTokenAndAuthorization, postAdBanner);
router.get("/company/find/:id",verifyTokenAndAuthorization, getSingleBanner); 
router.get("/company/unaccepted/:companyId",verifyTokenAndAuthorization, getOwnCompanyRequestAds); //unaccepted ads
router.get("/company/rejected/:companyId",verifyTokenAndAuthorization, getOwnRejectedCompanyRequestAds); //unaccepted ads
router.get("/unaccepted/all",verifyTokenAndAdmin, getAllCompanyRequestAds); //unaccepted ads all for admin
router.get("/accepted/all",verifyTokenAndAdmin, getAllCompanyAcceptedBannerAds); //unaccepted ads all for admin
router.get("/company/accepted/:companyId", getOwnCompanyAcceptedAds);
router.get("/company/accept/:id",verifyTokenAndAdmin, acceptCompanyBannerAds);
router.get("/company/reject/:id",verifyTokenAndAdmin, rejectCompanyBannerAds);
router.put("/company/edit/:id",verifyTokenAndAuthorization, editOwnBanner);
router.delete("/company/delete/:id",verifyTokenAndAuthorization,deleteOwnBanner)
router.get("/app", getBannerAds);
export default router;

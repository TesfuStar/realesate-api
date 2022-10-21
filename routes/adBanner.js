import express from "express";

const router = express.Router();

import {
  postAdBanner,
  getOwnCompanyRequestAds,
  getOwnCompanyAcceptedAds,
  acceptCompanyBannerAds,
  getBannerAds,
} from "../Controllers/AdBanner.js";

router.post("/add", postAdBanner);
router.get("/company/unaccepted/:companyId", getOwnCompanyRequestAds); //unaccepted ads
router.get("/company/accepted/:companyId", getOwnCompanyAcceptedAds);
router.put("/company/accept/:id", acceptCompanyBannerAds);

router.get("/app", getBannerAds);
export default router;

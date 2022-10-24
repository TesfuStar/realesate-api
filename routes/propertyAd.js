import express from "express";

const router = express.Router();

import {
  createPropertyAd,
  acceptPropertyAds,
  getCompanyRequestAds,
  getAllCompanyRequestAds,
  getAcceptedCompanyRequestAds,
  getSingleAdProperty,
  deletePropertyAdRequest,
  updatePropertyAdRequest
} from "../Controllers/PropertyAd.js";

router.post("/create", createPropertyAd);
router.get("/accept/:id", acceptPropertyAds);
router.get("/company/:companyId", getCompanyRequestAds);
router.get("/all", getAllCompanyRequestAds);
router.get("/accepted", getAcceptedCompanyRequestAds);
router.get("/company/ad/:id", getSingleAdProperty);
router.put("/company/ad/find/:id", updatePropertyAdRequest);
router.delete("/company/find/:id", deletePropertyAdRequest);
export default router;

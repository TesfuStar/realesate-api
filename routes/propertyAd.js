import express from "express";

const router = express.Router();

import {
  createPropertyAd,
  acceptPropertyAds,
  getCompanyRequestAds,
  getAllCompanyRequestAds,
} from "../Controllers/PropertyAd.js";

router.post("/create", createPropertyAd);
router.get("/accept", acceptPropertyAds);
router.get("/company/:companyId", getCompanyRequestAds);
router.get("/all", getAllCompanyRequestAds);
// router.put("/find/:id", updateOwner);
export default router;

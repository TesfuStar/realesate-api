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
  updatePropertyAdRequest,
  rejectPropertyAds,
  getAllRejectedCompanyRequestAds,
  getCompanyRejectedRequestAds
} from "../Controllers/PropertyAd.js";


import {
  verifyTokenAndAdmin,
  verifyTokenAndCompanyAdmin,
  verifyTokenAndAuthorization,

} from "../Middleware/authorization.js";

router.post("/create",verifyTokenAndAuthorization, createPropertyAd);
router.get("/accept/:id",verifyTokenAndAdmin, acceptPropertyAds);
router.get("/reject/:id",verifyTokenAndAdmin, rejectPropertyAds);
router.get("/company/:companyId",  verifyTokenAndAuthorization, getCompanyRequestAds);
router.get("/company/rejected/:companyId",  verifyTokenAndAuthorization, getCompanyRejectedRequestAds);
router.get("/all",verifyTokenAndAdmin, getAllCompanyRequestAds);
router.get("/all/rejected",verifyTokenAndAdmin, getAllRejectedCompanyRequestAds); //get all rejected
router.get("/accepted",verifyTokenAndAuthorization, getAcceptedCompanyRequestAds);
router.get("/company/ad/:id",verifyTokenAndAuthorization, getSingleAdProperty);
router.put("/company/ad/find/:id",verifyTokenAndAuthorization, updatePropertyAdRequest);
router.delete("/company/find/:id",verifyTokenAndAuthorization, deletePropertyAdRequest);
export default router;

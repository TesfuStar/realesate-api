import express from "express";

const router = express.Router();

import {
  createCompanyRequest,
  userLandingProfile,
  getAllCompanyRequest,
  getSingleCompanyRequest,
  getCompanyUserRequest,
  acceptCompanyRequest,
  getAllAcceptedCompanyRequest,
  rejectCompanyRequest,
  getAllRejectedCompanyRequest
} from "../Controllers/CompanyRequest.js";

import {
  verifyTokenAndAdmin,
  verifyTokenAndCompanyAdmin,
  verifyTokenAndAuthorization,
} from "../Middleware/authorization.js";


router.post("/create",verifyTokenAndAuthorization, createCompanyRequest);
router.get("/profile/:id",verifyTokenAndAuthorization, userLandingProfile);
router.get("/request",verifyTokenAndAdmin, getAllCompanyRequest);
router.get("/request-accepted",verifyTokenAndAdmin, getAllAcceptedCompanyRequest);
router.get("/request-rejected",verifyTokenAndAdmin, getAllRejectedCompanyRequest);
router.get("/request/:id",verifyTokenAndAdmin, getSingleCompanyRequest);
router.get("/request/user/:id",verifyTokenAndAdmin, getCompanyUserRequest);
router.post("/request/:id",verifyTokenAndAdmin, acceptCompanyRequest);
router.get("/request/reject/:id",verifyTokenAndAdmin, rejectCompanyRequest); //reject request
export default router;

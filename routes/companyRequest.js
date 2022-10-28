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

router.post("/create", createCompanyRequest);
router.get("/profile/:id", userLandingProfile);
router.get("/request", getAllCompanyRequest);
router.get("/request-accepted", getAllAcceptedCompanyRequest);
router.get("/request-rejected", getAllRejectedCompanyRequest);
router.get("/request/:id", getSingleCompanyRequest);
router.get("/request/user/:id", getCompanyUserRequest);
router.post("/request/:id", acceptCompanyRequest);
router.get("/request/reject/:id", rejectCompanyRequest); //reject request
export default router;

import express from "express";

const router = express.Router();

import {
  createAgentCompany,
  getAllAgentCompany,
  getSingleAgentCompany,
  updateAgentCompany,
  deleteAgentCompany,
  updateCompanyInformation,
  getOwnAgentCompanyInformation,
  getAllCompanyForApp
} from "../Controllers/AgentCompany.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndCompanyAdmin,
  verifyTokenAndAuthorization,
} from "../Middleware/authorization.js";
router.post("/create", createAgentCompany);
router.get("/",verifyTokenAndAdmin, getAllAgentCompany); //admin only
router.get("/app", getAllCompanyForApp); //for app only
router.get("/find/:id",verifyTokenAndAuthorization, getSingleAgentCompany);
router.get("/find/own/:companyId",verifyTokenAndAuthorization, getOwnAgentCompanyInformation);
router.delete("/find/:id",verifyTokenAndAdmin, deleteAgentCompany);
router.put("/find/company/:companyId",verifyTokenAndAuthorization, updateCompanyInformation);
export default router;

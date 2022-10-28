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

router.post("/create", createAgentCompany);
router.get("/", getAllAgentCompany); //admin only
router.get("/app", getAllCompanyForApp); //for app only
router.get("/find/:id", getSingleAgentCompany);
router.get("/find/own/:companyId", getOwnAgentCompanyInformation);
router.delete("/find/:id", deleteAgentCompany);
router.put("/find/company/:companyId", updateCompanyInformation);
export default router;

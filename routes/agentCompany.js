import express from "express";

const router = express.Router();

import {
  createAgentCompany,getAllAgentCompany,getSingleAgentCompany,updateAgentCompany,deleteAgentCompany
} from "../Controllers/AgentCompany.js";

router.post("/create", createAgentCompany);
router.get("/", getAllAgentCompany); //admin only
router.get("/find/:id", getSingleAgentCompany);
router.delete("/find/:id", deleteAgentCompany);
router.put("/find/:id", updateAgentCompany);
export default router;

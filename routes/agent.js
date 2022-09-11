import express from "express";

const router = express.Router();

import {
  createAgent,
  getAllAgents,
  getSingleAgent,
  deleteSingleAgent,
  updateAgent,
  getCompanyAgent,
} from "../Controllers/Agent.js";

router.post("/create", createAgent);
router.get("/", getAllAgents);
router.get("/find/:id", getSingleAgent);
router.get("/company/:companyId", getCompanyAgent);
router.delete("/find/:id", deleteSingleAgent);
router.put("/find/:id", updateAgent);
export default router;

import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndCompanyAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} from "../Middleware/authorization.js";

const router = express.Router();

import {
  createAgent,
  getAllAgents,
  getSingleAgent,
  deleteSingleAgent,
  updateAgent,
  getCompanyAgent,
  deleteCompanyAgent,
} from "../Controllers/Agent.js";

router.post("/create", createAgent);
router.get("/", getAllAgents);
router.get("/find/:id", verifyToken, getSingleAgent);
router.get("/company/:companyId", getCompanyAgent);
router.delete("/find/:id", deleteSingleAgent);
router.delete("/company/:id", deleteCompanyAgent);
router.put("/find/:id", updateAgent);
export default router;

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

router.post("/create", verifyTokenAndCompanyAdmin, createAgent);
router.get("/", verifyTokenAndAdmin, getAllAgents);
router.get("/find/:id", verifyToken, getSingleAgent);
router.get("/company/:companyId", verifyTokenAndAuthorization, getCompanyAgent);
router.delete("/find/:id", verifyTokenAndAuthorization, deleteSingleAgent);
router.delete("/company/:id", verifyTokenAndAuthorization, deleteCompanyAgent);
router.put("/find/:id", verifyTokenAndAuthorization, updateAgent);
export default router;

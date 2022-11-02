import express from "express";


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
import {
  verifyTokenAndAdmin,
  verifyTokenAndCompanyAdmin,
  verifyTokenAndAuthorization,
} from "../Middleware/authorization.js";
router.post("/create",verifyTokenAndCompanyAdmin, createAgent);
router.get("/",verifyTokenAndAuthorization, getAllAgents);
router.get("/find/:id", verifyTokenAndAuthorization, getSingleAgent);
router.get("/company/:companyId", getCompanyAgent);
router.delete("/find/:id",verifyTokenAndAuthorization, deleteSingleAgent);
router.delete("/company/:id",verifyTokenAndAuthorization, deleteCompanyAgent);
router.put("/find/:id",verifyTokenAndAuthorization, updateAgent);
export default router;

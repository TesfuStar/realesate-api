import express from "express";
import {verifyTokenAndAdmin,verifyTokenAndCompanyAdmin} from '../Middleware/authorization.js'
const router = express.Router();

import {
  adminDashboard,
  getAllUsers,
  getAllAgents,
  getAllCompanies,
  deleteUser,
  deleteCompany,
  getAllProperties,
  getCompanyDetail
} from "../Controllers/Admin.js";

router.get("/dashboard", adminDashboard);
router.get("/users", getAllUsers);
router.get("/agents", getAllAgents);
router.get("/owners", getAllCompanies);
router.get("/property", getAllProperties);
router.get("/owner/detail/:id", getCompanyDetail);
router.delete("/user/:id", deleteUser);
router.delete("/owner/:id", deleteCompany);
export default router;

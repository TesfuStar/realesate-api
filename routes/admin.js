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

router.get("/dashboard",verifyTokenAndAdmin, adminDashboard);
router.get("/users",verifyTokenAndAdmin, getAllUsers);
router.get("/agents",verifyTokenAndAdmin, getAllAgents);
router.get("/owners",verifyTokenAndAdmin, getAllCompanies);
router.get("/property",verifyTokenAndAdmin, getAllProperties);
router.get("/owner/detail/:id",verifyTokenAndAdmin, getCompanyDetail);
router.delete("/user/:id",verifyTokenAndAdmin, deleteUser);
router.delete("/owner/:id",verifyTokenAndAdmin, deleteCompany);
export default router;

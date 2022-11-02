import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndCompanyAdmin,
  verifyTokenAndAuthorization,
} from "../Middleware/authorization.js";
const router = express.Router();

import {
  dashboard,
  paginate,
  salesAnalysis
} from "../Controllers/Dashboard.js";

router.get("/company/:companyId",verifyTokenAndCompanyAdmin, dashboard);
router.get("/paginate",verifyTokenAndCompanyAdmin, paginate);
router.get("/sales/:companyId",verifyTokenAndCompanyAdmin, salesAnalysis);
export default router;




// 2519 07 00 07 24
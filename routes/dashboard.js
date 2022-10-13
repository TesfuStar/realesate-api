import express from "express";

const router = express.Router();

import {
  dashboard,
  paginate,
  salesAnalysis
} from "../Controllers/Dashboard.js";

router.get("/company/:companyId", dashboard);
router.get("/paginate", paginate);
router.get("/sales/:companyId", salesAnalysis);
export default router;

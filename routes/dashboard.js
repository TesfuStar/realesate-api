import express from "express";

const router = express.Router();

import {
  dashboard,
  paginate
} from "../Controllers/Dashboard.js";

router.get("/company/:companyId", dashboard);
router.get("/paginate", paginate);

export default router;

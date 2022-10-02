import express from "express";

const router = express.Router();

import {
  getCompanySoldProperties,
  getCompanyRentedProperties,
  addToSoldProperties,
  deleteCompanyRentedProperties
} from "../Controllers/SoldProperties.js";

router.get("/company/sold/:companyId", getCompanySoldProperties);
router.get("/company/rented/:companyId", getCompanyRentedProperties);
router.get("/add/:id", addToSoldProperties);
router.delete("/find/:id", deleteCompanyRentedProperties);
export default router;

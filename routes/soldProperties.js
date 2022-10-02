import express from "express";

const router = express.Router();

import {
  getCompanySoldProperties,
  getCompanyRentedProperties,
  addToSoldProperties,
  deleteCompanyRentedProperties,
  addToRentedProperties
} from "../Controllers/SoldProperties.js";

router.get("/company/sold/:companyId", getCompanySoldProperties);
router.get("/company/rented/:companyId", getCompanyRentedProperties);
router.get("/add/sold/:id", addToSoldProperties);
router.get("/add/rent/:id", addToRentedProperties);
router.delete("/find/:id", deleteCompanyRentedProperties);
export default router;

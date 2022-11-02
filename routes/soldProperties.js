import express from "express";

const router = express.Router();

import {
  getCompanySoldProperties,
  getCompanyRentedProperties,
  addToSoldProperties,
  deleteCompanyRentedProperties,
  addToRentedProperties,
  rePostRentedProperty
} from "../Controllers/SoldProperties.js";

import {
  verifyTokenAndAdmin,
  verifyTokenAndCompanyAdmin,
  verifyTokenAndAuthorization,
} from "../Middleware/authorization.js";

router.get("/company/sold/:companyId",verifyTokenAndAuthorization, getCompanySoldProperties);
router.get("/company/rented/:companyId", getCompanyRentedProperties);
router.get("/add/sold/:id",verifyTokenAndCompanyAdmin, addToSoldProperties);
router.get("/add/rented/:id",verifyTokenAndCompanyAdmin, addToRentedProperties);
router.get("/remove/rented/:id",verifyTokenAndCompanyAdmin, rePostRentedProperty);
router.delete("/find/:id",verifyTokenAndCompanyAdmin, deleteCompanyRentedProperties);
export default router;

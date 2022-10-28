import express from "express";

const router = express.Router();

import {
  createProperty,
  getAllProperty,
  getSingleProperty,
  deleteProperty,
  updateProperty,
  getPropertiesByFilter,
  getByPropertyType,
  getPropertyByOwner,
  getCompaniesProperty,
  getFeaturedProperty,
  getMostlyViewedProperty,
  getCompaniesFeaturedProperty,
  getCompaniesUnadvertisedProperty,
  getSinglePropertyDashboard,
  getOwnFeaturedProperty,
  getAllAgentCompanyProperty
} from "../Controllers/Property.js";

router.post("/create", createProperty);
router.get("/", getAllProperty);
router.get("/search", getPropertiesByFilter);
router.get("/find/:id", getSingleProperty);
router.get("/dashboard/:id", getSinglePropertyDashboard);
router.delete("/find/:id", deleteProperty);
router.put("/find/:id", updateProperty);
router.get('/type',getByPropertyType)
router.get('/owner/:id',getPropertyByOwner)
router.get('/company/:companyId',getCompaniesProperty)
router.get('/company/app/:companyId',getAllAgentCompanyProperty) //for app
router.get("/featured", getFeaturedProperty);
router.get("/company/featured/:companyId", getOwnFeaturedProperty);
router.get("/mostly-viewed", getMostlyViewedProperty);
router.get("/company/featured/:companyId", getCompaniesFeaturedProperty);
router.get("/company/un-featured/:companyId", getCompaniesUnadvertisedProperty);
export default router;

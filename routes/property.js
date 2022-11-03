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
  getAllAgentCompanyProperty,
  updatePropertyToHide,
  updatePropertyToUnHide
} from "../Controllers/Property.js";

import {
  verifyTokenAndAdmin,
  verifyTokenAndCompanyAdmin,
  verifyTokenAndAuthorization,
} from "../Middleware/authorization.js";

router.post("/create",verifyTokenAndCompanyAdmin, createProperty);
router.get("/", getAllProperty);
router.get("/search", getPropertiesByFilter);
router.get("/find/:id", getSingleProperty);
router.get("/dashboard/:id", getSinglePropertyDashboard);
router.delete("/find/:id",verifyTokenAndAuthorization, deleteProperty);
router.put("/find/:id",verifyTokenAndAuthorization, updateProperty);
router.get("/find/hide/:id",verifyTokenAndAdmin, updatePropertyToHide); //for admin only to hide property
router.get("/find/unhide/:id",verifyTokenAndAdmin, updatePropertyToUnHide); //for admin only to unHide
router.get('/type',getByPropertyType)
router.get('/owner/:id',getPropertyByOwner)
router.get('/company/:companyId',getCompaniesProperty)
router.get('/company/app/:companyId',getAllAgentCompanyProperty) //for app
router.get("/featured", getFeaturedProperty);
router.get("/company/featured/:companyId", getOwnFeaturedProperty);
router.get("/mostly-viewed", getMostlyViewedProperty);
router.get("/company/featured/:companyId",verifyTokenAndAuthorization, getCompaniesFeaturedProperty);
router.get("/company/un-featured/:companyId",verifyTokenAndAuthorization, getCompaniesUnadvertisedProperty);
export default router;

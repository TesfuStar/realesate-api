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
  getPropertyByOwner
} from "../Controllers/Property.js";

router.post("/create", createProperty);
router.get("/", getAllProperty);
router.get("/search", getPropertiesByFilter);
router.get("/find/:id", getSingleProperty);
router.delete("/find/:id", deleteProperty);
router.put("/find/:id", updateProperty);
router.get('/type',getByPropertyType)
router.get('/owner/:id',getPropertyByOwner)
export default router;

import express from "express";

const router = express.Router();

import {
  createOwner,getAllOwners,getSingleCompany,deleteSingleOwner,updateOwner
} from "../Controllers/Owner.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndCompanyAdmin,
  verifyTokenAndAuthorization,
} from "../Middleware/authorization.js";

router.post("/create",verifyTokenAndAdmin, createOwner);
router.get("/", getAllOwners);
router.get("/find/:id",verifyTokenAndAdmin, getSingleCompany);
router.delete("/find/:id",verifyTokenAndAdmin, deleteSingleOwner);
router.put("/find/:id",verifyTokenAndAdmin, updateOwner);
export default router;

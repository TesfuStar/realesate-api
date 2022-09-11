import express from "express";

const router = express.Router();

import {
  createOwner,getAllOwners,getSingleCompany,deleteSingleOwner,updateOwner
} from "../Controllers/owner.js";

router.post("/create", createOwner);
router.get("/", getAllOwners);
router.get("/find/:id", getSingleCompany);
router.delete("/find/:id", deleteSingleOwner);
router.put("/find/:id", updateOwner);

export default router;

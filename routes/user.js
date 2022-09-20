import express from "express";

const router = express.Router();

import {
  updateUser,createCompany
} from "../Controllers/User.js";


router.put("/find/:id", updateUser);
router.get("/company/:id", createCompany);
// router.get("/find/:id", getSingleCompany);
// router.delete("/find/:id", deleteSingleOwner);
export default router;

import express from "express";

const router = express.Router();

import {
  updateUser,createCompany,userProfile
} from "../Controllers/User.js";


router.put("/find/:id", updateUser);
router.get("/company/:id", createCompany);
router.get("/profile/:companyId", userProfile);
// router.delete("/find/:id", deleteSingleOwner);
export default router;

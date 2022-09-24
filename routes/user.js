import express from "express";

const router = express.Router();

import {
  updateUser,createCompany,userProfile,addToFavorites
} from "../Controllers/User.js";


router.put("/find/:id", updateUser);
router.get("/company/:id", createCompany);
router.get("/profile/:companyId", userProfile);
router.put("/find/favorite/:id", addToFavorites);
export default router;

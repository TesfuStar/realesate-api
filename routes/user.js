import express from "express";

const router = express.Router();

import {
  updateUser,
  createCompany,
  userProfile,
  addToFavorites,
  userAppProfile,
} from "../Controllers/User.js";

router.put("/find/:id", updateUser);
router.post("/company/:id", createCompany);
router.get("/profile/:companyId", userProfile);
router.put("/find/favorite/:id", addToFavorites);
router.get("/profile/app/:id", userAppProfile);
export default router;

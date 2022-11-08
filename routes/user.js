import express from "express";

const router = express.Router();

import {
  updateUser,
  createCompany,
  userProfile,
  addToFavorites,
  userAppProfile,
  getSingleUser
} from "../Controllers/User.js";


import {
  verifyTokenAndAdmin,
  verifyTokenAndCompanyAdmin,
  verifyTokenAndAuthorization,
} from "../Middleware/authorization.js";

router.put("/find/:id", updateUser);
router.get("/find/:id",verifyTokenAndAdmin, getSingleUser);
router.post("/company/:id", createCompany);
router.get("/profile/:companyId", userProfile);
router.put("/find/favorite/:id", addToFavorites);
router.get("/profile/app/:id", userAppProfile);
export default router;

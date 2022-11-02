import express from "express";

const router = express.Router();

import {
 addToFavorite,getUserFavorite,removeUserFavorite
} from "../Controllers/Favorite.js";
import {
    verifyTokenAndAdmin,
    verifyTokenAndCompanyAdmin,
    verifyTokenAndAuthorization,
  } from "../Middleware/authorization.js";
  
router.put("/add/:id",verifyTokenAndAuthorization, addToFavorite);
router.put("/remove/:id",verifyTokenAndAuthorization, removeUserFavorite);
router.get("/user/:id",verifyTokenAndAuthorization, getUserFavorite);
export default router;

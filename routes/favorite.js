import express from "express";

const router = express.Router();

import {
 addToFavorite,getUserFavorite,removeUserFavorite
} from "../Controllers/Favorite.js";

router.put("/add/:id", addToFavorite);
router.put("/remove/:id", removeUserFavorite);
router.get("/user/:id", getUserFavorite);
export default router;

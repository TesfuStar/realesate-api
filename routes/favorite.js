import express from "express";

const router = express.Router();

import {
 addToFavorite,getUserFavorite
} from "../Controllers/Favorite.js";

router.put("/add/:id", addToFavorite);
router.get("/user/:id", getUserFavorite);
export default router;

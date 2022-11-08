import express from "express";

const router = express.Router();

import {
commentToAgent,getAgentComments,editOwnComment,deleteOwnComment
} from "../Controllers/Comment.js";
import {
    verifyTokenAndAdmin,
    verifyTokenAndCompanyAdmin,
    verifyTokenAndAuthorization,
  } from "../Middleware/authorization.js";
router.post("/add", commentToAgent);
router.put("/edit/:id", editOwnComment);
router.get("/agent/:id", getAgentComments);
router.delete("/delete/:id", deleteOwnComment);
export default router;

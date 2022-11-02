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
router.post("/add",verifyTokenAndAuthorization, commentToAgent);
router.put("/edit/:id",verifyTokenAndAuthorization, editOwnComment);
router.get("/agent/:id",verifyTokenAndAuthorization, getAgentComments);
router.delete("/delete/:id",verifyTokenAndAuthorization, deleteOwnComment);
export default router;

import express from "express";

const router = express.Router();

import {
  getAllCompanyNotification,
  getUnreadNotification,
  markAsReadNotification,
  sendNotification,
  markAllAsReadNotification,
  getAllAdminNotification,
  getAllUnreadAdminNotification,
  markAllAsReadNotificationForAdmin
} from "../Controllers/Notification.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndCompanyAdmin,
  verifyTokenAndAuthorization,
} from "../Middleware/authorization.js";

router.get("/company/:companyId",verifyTokenAndCompanyAdmin, getAllCompanyNotification);
router.get("/admin/:userId",verifyTokenAndAdmin, getAllAdminNotification);//admin
router.get("/company/unread/:companyId",verifyTokenAndCompanyAdmin, getUnreadNotification);
router.get("/admin/unread/:userId",verifyTokenAndAdmin, getAllUnreadAdminNotification);
router.get("/mark/:id",verifyTokenAndAuthorization, markAsReadNotification);
router.post("/send",verifyTokenAndAuthorization, sendNotification);
router.get("/company/all/unread/:companyId",verifyTokenAndAuthorization, markAllAsReadNotification);
router.get("/admin/all/unread/:companyId",verifyTokenAndAuthorization, markAllAsReadNotificationForAdmin);
export default router;

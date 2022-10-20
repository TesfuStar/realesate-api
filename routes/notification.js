import express from "express";

const router = express.Router();

import {
  getAllCompanyNotification,
  getUnreadNotification,
  markAsReadNotification,
  sendNotification,
  markAllAsReadNotification,
  getAllAdminNotification,
  getAllUnreadAdminNotification
} from "../Controllers/Notification.js";

router.get("/company/:companyId", getAllCompanyNotification);
router.get("/admin/:userId", getAllAdminNotification);//admin
router.get("/company/unread/:companyId", getUnreadNotification);
router.get("/admin/unread/:userId", getAllUnreadAdminNotification);
router.get("/mark/:id", markAsReadNotification);
router.post("/send", sendNotification);
router.get("/company/all/unread/:companyId", markAllAsReadNotification);
export default router;
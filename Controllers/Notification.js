import Notification from "../Models/Notification.js";

//send notification
export const sendNotification = async (req, res) => {
  const newNotification = new Notification(req.body);
  try {
    const savedNotification = await newNotification.save();
    res.status(201).json({ success: true, data: savedNotification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get own company notification

export const getAllCompanyNotification = async (req, res) => {
  try {
    const allNotification = await Notification.find({
      companyId: req.params.companyId,
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: allNotification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get admin company notification

export const getAllAdminNotification = async (req, res) => {
  try {
    const allNotification = await Notification.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: allNotification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get unread admin company notification

export const getAllUnreadAdminNotification = async (req, res) => {
  try {
    const allUnreadNotification = await Notification.find({
      userId: req.params.userId,
      readAt: null,
    }).sort({ createdAt: -1 });
    const allNotificationCount = await Notification.find({
      userId: req.params.userId,
      readAt: null,
    }).count();
    res.status(200).json({
      success: true,
      data: allUnreadNotification,
      count: allNotificationCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get unread notification
export const getUnreadNotification = async (req, res) => {
  try {
    const allUnreadNotification = await Notification.find({
      companyId: req.params.companyId,
      readAt: null,
    }).sort({ createdAt: -1 });
    const allNotificationCount = await Notification.find({
      companyId: req.params.companyId,
      readAt: null,
    }).count();
    res.status(200).json({
      success: true,
      data: allUnreadNotification,
      count: allNotificationCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//mark as read notifications

export const markAsReadNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification)
      return res.status(400).json({ message: "notification not found" });

    const updateNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { readAt: new Date() },
      { new: true }
    );
    res.status(200).json({ success: true, data: updateNotification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//mark all as read
export const markAllAsReadNotification = async (req, res) => {
  try {
    const updateNotification = await Notification.updateMany(
      { companyId: req.params.companyId, readAt: null },
      { readAt: new Date() },
      { new: true }
    );
    res.status(200).json({ success: true, data: updateNotification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//mark all as read for admin
export const markAllAsReadNotificationForAdmin = async (req, res) => {
  try {
    const updateNotification = await Notification.updateMany(
      { id: req.params.id, readAt: null },
      { readAt: new Date() },
      { new: true }
    );
    res.status(200).json({ success: true, data: updateNotification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
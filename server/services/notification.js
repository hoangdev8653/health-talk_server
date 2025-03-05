const db = require("../models");

const getAllNotification = async () => {
  try {
    return await db.Notifications.findAll();
  } catch (error) {
    console.log(error);
  }
};

const getNotificationByUser = async (userId) => {
  const notification = await db.Notifications.findOne({
    where: { receiverId: userId },
  });
  if (!notification) {
    return "Người dùng chưa có thông báo";
  }
  return notification;
};

const createNotification = async (data) => {
  try {
    const notification = await db.Notifications.create({
      data,
    });
    return notification;
  } catch (error) {
    console.log(error);
  }
};

const deleteNotification = async (id) => {
  try {
    const notification = await db.Notifications.findOne({ where: { id } });
    if (!notification) {
      throw new Error("Notification Không tồn tại");
    }
    return await db.Notifications.destroy({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllNotification,
  getNotificationByUser,
  createNotification,
  deleteNotification,
};

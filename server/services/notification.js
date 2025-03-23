const db = require("../models");

const getAllNotification = async () => {
  try {
    return await db.Notifications.findAll();
  } catch (error) {
    console.log(error);
  }
};

const getNotificationByUser = async (userId) => {
  const notifications = await db.Notifications.findAll({
    where: { receiverId: userId },
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["receiverId", "senderId", "postId"] },
    include: [
      {
        model: db.Users,
        as: "sender",
        attributes: ["id", "username", "image"],
      },
      {
        model: db.Users,
        as: "receiver",
        attributes: ["id", "username", "image"],
      },
      {
        model: db.Articles,
        as: "post",
        attributes: ["id", "image", "slug"],
      },
    ],
  });

  return notifications.length > 0 ? notifications : [];
};

const updateStatusNotification = async (id) => {
  try {
    const notification = await db.Notifications.findOne({ where: { id } });
    if (!notification) {
      throw new Error("Notification Không tồn tại");
    }
    return await db.Notifications.update({ is_read: true }, { where: { id } });
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
  updateStatusNotification,
  deleteNotification,
};

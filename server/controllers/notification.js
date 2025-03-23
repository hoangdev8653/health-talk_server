const { StatusCodes } = require("http-status-codes");
const notificationService = require("../services/notification");

const getAllNotification = async (req, res, next) => {
  try {
    const notification = await notificationService.getAllNotification();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: notification,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getNotificationByUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const notification = await notificationService.getNotificationByUser(
      userId
    );
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: notification,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createNotification = async (req, res, next) => {
  try {
    const {} = req.body;
    const notification = await notificationService.createNotification({});
    return res.status(StatusCodes.CREATED).json({
      status: 200,
      message: "Xử lý thành công",
      content: notification,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateStatusNotification = async (req, res, next) => {
  try {
    const id = req.query.id;
    const notification = await notificationService.updateStatusNotification(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: notification,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const id = req.query.id;
    const notification = await notificationService.deleteNotification(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: notification,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllNotification,
  getNotificationByUser,
  updateStatusNotification,
  createNotification,
  deleteNotification,
};

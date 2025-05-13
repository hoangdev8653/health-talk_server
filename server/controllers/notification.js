const { StatusCodes } = require("http-status-codes");
const notificationService = require("../services/notification");

const getAllNotification = async (req, res, next) => {
  try {
    const notifications = await notificationService.getAllNotification();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy danh sách thông báo thành công",
      content: notifications,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thông báo:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy danh sách thông báo",
    });
  }
};

const getNotificationById = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }
    const notification = await notificationService.getNotificationById(id);
    if (!notification) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Thông báo không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy thông báo thành công",
      content: notification,
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông báo theo ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy thông báo theo ID",
    });
  }
};

const getNotificationByUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "User ID không được để trống",
      });
    }
    const notifications = await notificationService.getNotificationByUser(
      userId
    );
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy thông báo theo người dùng thành công",
      content: notifications,
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông báo theo người dùng:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy thông báo theo người dùng",
    });
  }
};

const createNotification = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;
    if (!title || !content || !userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Tiêu đề, nội dung và User ID không được để trống",
      });
    }
    const notification = await notificationService.createNotification({
      title,
      content,
      userId,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo thông báo thành công",
      content: notification,
    });
  } catch (error) {
    console.error("Lỗi khi tạo thông báo:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể tạo thông báo",
    });
  }
};

const updateStatusNotification = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }
    const notification = await notificationService.updateStatusNotification(id);
    if (!notification) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Thông báo không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật trạng thái thông báo thành công",
      content: notification,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái thông báo:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể cập nhật trạng thái thông báo",
    });
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const id = req.query.id;
    const userId = req.userId;
    if (!id || !userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID và User ID không được để trống",
      });
    }
    const notification = await notificationService.deleteNotification(
      id,
      userId
    );
    if (!notification) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Thông báo không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa thông báo thành công",
      content: notification,
    });
  } catch (error) {
    console.error("Lỗi khi xóa thông báo:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể xóa thông báo",
    });
  }
};

module.exports = {
  getAllNotification,
  getNotificationById,
  getNotificationByUser,
  createNotification,
  updateStatusNotification,
  deleteNotification,
};

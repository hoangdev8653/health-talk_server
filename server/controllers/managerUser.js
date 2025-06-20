const managerServices = require("../services/managerUsers");
const { StatusCodes } = require("http-status-codes");

const getAllBlockedUsers = async (req, res, next) => {
  try {
    const blockedUsers = await managerServices.getAllBlockedUsers();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: blockedUsers,
    });
  } catch (error) {
    next(error);
  }
};

const checkIsBlockByUserId = async (req, res, next) => {
  try {
    const id = req.query.id;
    const checkIsBlock = await managerServices.checkIsBlockByUserId(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: checkIsBlock,
    });
  } catch (error) {
    next(error);
  }
};

const blockUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { userBlockedId, blockReason } = req.body;
    const blockUser = await managerServices.blockUser(userId, {
      blockedById: userId,
      userBlockedId,
      blockReason,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Xử lý thành công", content: blockUser });
  } catch (error) {
    next(error);
  }
};

const unblockUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    const unblockUser = await managerServices.unblockUser(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: unblockUser });
  } catch (error) {
    next(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteBlockedUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    const deleteBlockedUser = await managerServices.deleteBlockedUser(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: deleteBlockedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBlockedUsers,
  checkIsBlockByUserId,
  blockUser,
  unblockUser,
  deleteBlockedUser,
};

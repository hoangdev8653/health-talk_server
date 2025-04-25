const { StatusCodes } = require("http-status-codes");
const userServices = require("../services/user");

const getAllUser = async (req, res, next) => {
  try {
    const user = await userServices.getAllUser();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, messeage: "Xử lý thành công", content: user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const user = await userServices.getUserById(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      messeage: "Xử lý thành công",
      content: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const userId = req.UserId;
    const fileData = req.file;
    const user = await userServices.updateAvatar(userId, {
      image: fileData?.path,
    });
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, messeage: "Xử lý thành công", content: user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await userServices.register({ username, email, password });
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, messeage: "Xử lý thành công", content: user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken, checkblock } =
      await userServices.login({
        email,
        password,
      });
    return res.status(StatusCodes.OK).json({
      status: 200,
      messeage: "Xử lý thành công",
      content: user,
      isBlock: checkblock,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { password, newPassword } = req.body;
    const user = await userServices.changePassword(userId, {
      password,
      newPassword,
    });
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, messeage: "Xử lý thành công", content: user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { role } = req.body;
    const user = await userServices.updateRole(userId, { role });
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, messeage: "Xử lý thành công", content: user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const newToken = await userServices.refreshToken(refreshToken);
    return res.status(StatusCodes.OK).json({
      status: 200,
      messeage: "xử lý thành công",
      newToken,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    const user = await userServices.deleteUser(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, messeage: "Xử lý thành công", content: user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllUser,
  getUserById,
  updateAvatar,
  changePassword,
  updateRole,
  register,
  login,
  refreshToken,
  deleteUser,
};

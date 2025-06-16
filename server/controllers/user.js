const { StatusCodes } = require("http-status-codes");
const userServices = require("../services/user");
const { serialize } = require("cookie");

const getAllUser = async (req, res, next) => {
  try {
    const users = await userServices.getAllUser();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy danh sách người dùng",
    });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const user = await userServices.getUserById(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Người dùng không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy thông tin người dùng",
    });
  }
};

const updateUsername = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { username } = req.body;
    const user = await userServices.updateUsername(userId, { username });
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Cập nhật thành công", content: user });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Server Error",
    });
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const userId = req.userId;
    const fileData = req.file;
    if (!fileData) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Không có tệp được tải lên",
      });
    }
    const user = await userServices.updateAvatar(userId, {
      image: fileData.path,
    });
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật ảnh đại diện thành công",
      content: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể cập nhật ảnh đại diện",
    });
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await userServices.register({ username, email, password });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Đăng ký thành công",
      content: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể đăng ký người dùng",
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken, checkblock } =
      await userServices.login({ email, password });

    res.setHeader(
      "Set-Cookie",
      serialize("token", accessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 ngày
        sameSite: "strict",
        // secure: process.env.NODE_ENV === 'production',
      })
    );

    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Đăng nhập thành công",
      content: user,
      isBlock: checkblock,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error.message);
    if (
      error.message === "Email không tồn tại" ||
      error.message === "Mật khẩu không đúng"
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: error.message,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể đăng nhập",
    });
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
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Đổi mật khẩu thành công",
      content: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể đổi mật khẩu",
    });
  }
};

const updateRole = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { role, id } = req.body;
    const user = await userServices.updateRole(userId, { role, id });
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật vai trò thành công",
      content: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể cập nhật vai trò",
    });
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const newToken = await userServices.refreshToken(refreshToken);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Làm mới token thành công",
      newToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: 401,
      message: "Token không hợp lệ hoặc đã hết hạn",
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    const user = await userServices.deleteUser(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Người dùng không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa người dùng thành công",
      content: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể xóa người dùng",
    });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  updateUsername,
  updateAvatar,
  changePassword,
  updateRole,
  register,
  login,
  refreshToken,
  deleteUser,
};

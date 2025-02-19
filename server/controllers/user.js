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
    const { user, accessToken, refreshToken } = await userServices.login({
      email,
      password,
    });
    return res.status(StatusCodes.OK).json({
      status: 200,
      messeage: "Xử lý thành công",
      content: user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const newToken = await userServices.refreshToken(refreshToken);
    console.log(newToken);

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

module.exports = {
  getAllUser,
  register,
  login,
  refreshToken,
};

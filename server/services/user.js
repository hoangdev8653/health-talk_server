const db = require("../models");
const { hashPassword, passwordMatch } = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");

const getAllUser = async () => {
  try {
    const users = await db.Users.findAll();
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await db.Users.findOne({ where: { id } });
    if (!user) {
      throw new Error("User không tồn tại");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateAvatar = async (userId, { image }) => {
  try {
    const user = await db.Users.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User không tồn tại");
    }
    const updateUser = await db.Users.update(
      { image },
      { where: { id: userId } }
    );
    return updateUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const changePassword = async (userId, { password, newPassword }) => {
  try {
    const user = await db.Users.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User không tồn tại");
    }
    const isPasswordValid = await passwordMatch(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Mật khẩu không chính xác");
    }
    const newPasswordHashed = await hashPassword(newPassword);
    const updated = await db.Users.update(
      { password: newPasswordHashed },
      { where: { id: userId } }
    );

    if (updated[0] === 0) {
      throw new Error("Không có bản ghi nào được cập nhật");
    }

    return { message: "Cập nhật mật khẩu thành công!" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateRole = async (userId, { role }) => {
  try {
    const user = await db.Users.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User không tồn tại");
    }
    const updatedUser = await db.Users.update(
      { role },
      { where: { id: userId } }
    );
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const register = async ({ username, email, password }) => {
  try {
    const existingUser = await db.Users.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email đã tồn tại");
    }
    const passwordHashed = await hashPassword(password);
    const user = await db.Users.create({
      username,
      email,
      password: passwordHashed,
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await db.Users.findOne({ where: { email } });
    if (!user) {
      throw new Error("Email Không tồn tại");
    }
    const isMatch = await passwordMatch(password, user.password);
    if (!isMatch) {
      throw new Error("Mật khẩu không đúng");
    }
    const managerServices = require("../services/managerUsers");
    const checkblock = await managerServices.checkIsBlockByUserId(user.id);
    const { accessToken, refreshToken } = generateToken(user.id);
    return { user, accessToken, refreshToken, checkblock };
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async (refreshToken) => {
  try {
    const { userId } = await verifyRefreshToken(refreshToken);
    const newToken = generateToken(userId);
    return newToken;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (idid) => {
  const user = await db.Users.findOne({ where: { id } });
  if (!user) {
    throw new Error("User không tồn tại");
  }
  return await db.Users.distroy({ where: { id } });
};

module.exports = {
  getAllUser,
  getUserById,
  register,
  login,
  changePassword,
  updateAvatar,
  updateRole,
  refreshToken,
  deleteUser,
};

const db = require("../models");
const { hashPassword, passwordMatch } = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");

const getAllUser = async () => {
  try {
    const allUsers = await db.Users.findAll();
    const managerServices = require("../services/managerUsers");
    const blockedUserRecords = await managerServices.getAllBlockedUsers();
    const blockedUserIds = blockedUserRecords
      .filter((record) => record.isBlocked === true)
      .map((record) => record.userBlocked.id);
    const activeUserIds = allUsers
      .map((user) => user.id)
      .filter((id) => !blockedUserIds.includes(id));
    const activeUsers = allUsers.filter((user) =>
      activeUserIds.includes(user.id)
    );

    return activeUsers || [];
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

const updateUsername = async (userId, { username }) => {
  try {
    console.log(userId);
    console.log(username);

    const user = await db.Users.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User không tồn tại");
    }
    const updateUser = await db.Users.update(
      { username },
      { where: { id: userId } }
    );
    return updateUser;
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

const updateRole = async (userId, { role, id }) => {
  try {
    const user = await db.Users.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User không tồn tại");
    }
    const updatedUser = await db.Users.update({ role }, { where: { id } });
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
    const { accessToken, refreshToken } = generateToken(user.id, user.role);

    return { user, accessToken, refreshToken, checkblock };
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async (refreshToken) => {
  try {
    const { userId, role } = await verifyRefreshToken(refreshToken);
    const newToken = generateToken(userId, role);
    return newToken;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
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
  updateUsername,
  updateAvatar,
  updateRole,
  refreshToken,
  deleteUser,
};

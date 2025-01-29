const db = require("../models");
const { hashPassword, passwordMatch } = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");

const getAllUser = async () => {
  try {
    const users = await db.User.findAll();
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const register = async ({ username, email, password }) => {
  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email đã tồn tại");
    }
    const passwordHashed = await hashPassword(password);
    const user = await db.User.create({
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
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Email Không tồn tại");
    }    
    const isMatch = await passwordMatch(password, user.password);
    if (!isMatch) {
      throw new Error("Mật khẩu không đúng");
    }
    const {accessToken, refreshToken } = generateToken(user.id);
    return { user, accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUser,
  register,
  login
};

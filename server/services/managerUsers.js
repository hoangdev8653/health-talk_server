const db = require("../models");

const getAllBlockedUsers = async () => {
  return await db.ManagerUsers.findAll({
    attributes: { exclude: ["userBlocked", "blockedBy"] },
    include: [
      {
        model: db.Users,
        as: "blockedBy",
        attributes: ["id", "username", "email", "image"],
      },
      {
        model: db.Users,
        as: "userBlocked",
        attributes: ["id", "username", "email", "image"],
      },
    ],
  });
};

const checkIsBlockByUserId = async (id) => {
  try {
    const totalBlock = await db.ManagerUsers.findAll({
      attributes: { exclude: ["userBlocked", "blockedBy"] },
      include: [
        {
          model: db.Users,
          as: "blockedBy",
          attributes: ["id", "username", "email", "image"],
        },
        {
          model: db.Users,
          as: "userBlocked",
          attributes: ["id", "username", "email", "image"],
        },
      ],
    });
    const checkMatchUserBlock = totalBlock.some(
      (item) => item.userBlocked.id === id
    );
    return checkMatchUserBlock;
  } catch (error) {
    console.error("Error checking block status:", error);
    throw error;
  }
};

const blockUser = async (
  userId,
  { blockedById, userBlockedId, blockReason }
) => {
  try {
    const isUser = await db.Users.findOne({
      where: {
        id: userId,
      },
    });
    if (!isUser) {
      throw new Error("User not found");
    }
    const blockUser = await db.ManagerUsers.create({
      blockedById,
      userBlockedId,
      blockReason,
      isBlocked: true,
      blockedAt: new Date(),
    });
    return blockUser;
  } catch (error) {
    console.error("Error blocking user:", error);
    throw error;
  }
};

const unblockUser = async (id) => {
  const isId = await db.ManagerUsers.findOne({
    where: {
      id,
    },
  });
  if (!isId) {
    throw new Error("Id not found");
  }
  const unblockUser = await db.ManagerUsers.update(
    {
      isBlocked: false,
      unblockedAt: new Date(),
    },
    {
      where: { id },
    }
  );
  return unblockUser;
};

const deleteBlockedUser = async (id) => {
  const isId = await db.ManagerUsers.findOne({
    where: {
      id,
    },
  });
  if (!isId) {
    throw new Error("Id not found");
  }
  const deleteBlockedUser = await db.ManagerUsers.destroy({
    where: { id },
  });
  return deleteBlockedUser;
};

module.exports = {
  getAllBlockedUsers,
  checkIsBlockByUserId,
  blockUser,
  unblockUser,
  deleteBlockedUser,
};

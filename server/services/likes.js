const db = require("../models");

const getAllLikes = async () => {
  try {
    return await db.Likes.findAll({
      attributes: { exclude: ["userId", "postId"] },
      include: [
        {
          model: db.Articles,
          attributes: ["id", "title", "image"],
        },
        {
          model: db.Users,
          attributes: ["id", "username", "email", "image"],
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

const getLikeByPostId = async (postId) => {
  try {
    const likes = await db.Likes.findAll();
    const totalLikes = likes.filter((likes) => {
      return likes.postId == postId;
    });
    return totalLikes;
  } catch (error) {
    console.log(error);
  }
};

const createLike = async ({ userId, postId }) => {
  try {
    const existingLike = await db.Likes.findOne({
      where: { userId, postId },
    });
    if (existingLike) {
      await existingLike.destroy();
      return "Bạn đã bỏ like bài viết này";
    }
    await db.Likes.create({ userId, postId });
    return "Bạn đã like bài viết này";
  } catch (error) {
    console.log(error);
    return "Có lỗi xảy ra";
  }
};

const deleteLike = async (id) => {
  try {
    const like = await db.Likes.findOne({ where: { id } });
    if (!like) {
      throw new Error("Id không tồn tại");
    }
    return await db.Likes.destroy({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllLikes,
  getLikeByPostId,
  createLike,
  deleteLike,
};

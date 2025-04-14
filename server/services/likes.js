const db = require("../models");

const getAllLikes = async () => {
  try {
    return await db.Likes.findAll({
      attributes: { exclude: ["userId", "postId"] },
      include: [
        {
          model: db.Articles,
          attributes: ["id", "title", "slug"],
        },
        {
          model: db.Users,
          attributes: ["id", "username", "image"],
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

const getLikeByPostId = async (postId) => {
  try {
    const likes = await db.Likes.findAll({
      attributes: { exclude: ["userId", "postId"] },
      include: [
        {
          model: db.Articles,
          attributes: ["id", "title", "slug"],
        },
        {
          model: db.Users,
          attributes: ["id", "username", "image"],
        },
      ],
    });
    const totalLikes = likes.filter((likes) => {
      return likes.Article.id == postId;
    });
    return totalLikes;
  } catch (error) {
    console.log(error);
  }
};

const getLikeBySlugArticle = async (slug) => {
  try {
    const likes = await db.Likes.findAll({
      attributes: { exclude: ["userId", "postId"] },
      include: [
        {
          model: db.Articles,
          attributes: ["id", "title", "slug"],
        },
        {
          model: db.Users,
          attributes: ["id", "username", "image"],
        },
      ],
    });
    const totalLikes = likes.filter((likes) => {
      return likes.Article.slug == slug;
    });
    return totalLikes;
  } catch (error) {
    console.log(error);
  }
};

const createLike = async ({ userId, postId }) => {
  try {
    const isLike = await db.Likes.findOne({
      where: { userId, postId },
    });
    if (isLike) {
      const checkNotification = await db.Notifications.findOne({
        where: {
          senderId: isLike.userId,
          postId: isLike.postId,
          type: "like",
        },
      });
      await db.Notifications.destroy({ where: { id: checkNotification.id } });
      await isLike.destroy();
      const newListLike = await db.Likes.findAll({ where: { postId } });

      return { message: "Bạn đã bỏ like bài viết này", newListLike };
    }
    await db.Likes.create({ userId, postId });
    const userServices = require("../services/user");
    const articleServices = require("../services/articles");
    const user = await userServices.getUserById(userId);
    const article = await articleServices.getArticleById(postId);
    if (userId === !article.User.id) {
      await db.Notifications.create({
        receiverId: article.User.id,
        senderId: userId,
        postId: article.id,
        type: "like",
        message: `${user.username} đã like bài viết của bạn`,
        is_read: false,
      });
    }

    const newListLike = await db.Likes.findAll({ where: { postId } });
    return { message: "Bạn đã like bài viết này", newListLike };
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
  getLikeBySlugArticle,
  createLike,
  deleteLike,
};

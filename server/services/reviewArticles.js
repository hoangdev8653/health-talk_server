const db = require("../models");

const getAllReview = async () => {
  try {
    return await db.ReviewArticles.findAll();
  } catch (error) {
    console.log(error);
  }
};

const getReviewById = async (id) => {
  try {
    const review = await db.ReviewArticles.findOne({ where: { id } });
    if (!review) {
      throw new Error("Review không tồn tại");
    }
    return review;
  } catch (error) {
    console.log(error);
  }
};

const getReviewByArticle = async (articleId) => {
  try {
    const review = await db.ReviewArticles.findAll({
      where: { articleId },
      attributes: { exclude: ["userId"] },
      include: [
        {
          model: db.Users,
          attributes: ["id", "username", "email", "image"],
        },
      ],
    });
    if (!review) {
      throw new Error("Review không tồn tại");
    }
    return review;
  } catch (error) {
    console.log(error);
  }
};

const createReview = async ({ content, userId, articleId }) => {
  try {
    const review = await db.ReviewArticles.create({
      content,
      userId,
      articleId,
    });

    const articleServices = require("../services/articles");
    const userServices = require("../services/user");
    const user = await userServices.getUserById(userId);
    const article = await articleServices.getArticleById(articleId);

    await db.Notifications.create({
      receiverId: article.User.id,
      senderId: userId,
      postId: article.id,
      type: "comment",
      message: `${user.username} Đã bình luận vào bài viết của bạn`,
      is_read: false,
    });
    return review;
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (id) => {
  try {
    const review = await db.ReviewArticles.findOne({ where: { id } });
    if (!review) {
      throw new Error("Review không tồn tại");
    }
    return await db.ReviewArticles.destroy({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllReview,
  getReviewById,
  getReviewByArticle,
  createReview,
  deleteReview,
};

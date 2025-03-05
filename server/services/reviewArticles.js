const db = require("../models");
const articleServices = require("../services/articles");

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

const createReview = async ({
  content,
  likes,
  userId,
  articleId,
  parentId,
}) => {
  try {
    const review = db.ReviewArticles.create({
      content,
      likes,
      userId,
      articleId,
      parentId,
    });

    const article = await articleServices.getArticleById(articleId);
    await db.Notifications.create({
      receiverId: article.User.id,
      senderId: userId,
      postId: article.id,
      type: "comment",
      message: `${article.User.username} Đã bình luận vào bài viết của bạn`,
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
  createReview,
  deleteReview,
};

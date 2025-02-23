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

const createReview = async ({
  content,
  likes,
  userId,
  articleId,
  parentId,
}) => {
  try {
    return await db.ReviewArticles.create({
      content,
      likes,
      userId,
      articleId,
      parentId,
    });
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

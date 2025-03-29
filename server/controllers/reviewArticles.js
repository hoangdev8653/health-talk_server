const { StatusCodes } = require("http-status-codes");
const reviewArticleServices = require("../services/reviewArticles");

const getAllReview = async (req, res, next) => {
  try {
    const review = await reviewArticleServices.getAllReview();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: review });
  } catch (error) {
    next(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const review = await reviewArticleServices.getReviewById(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: review });
  } catch (error) {
    next(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

const getReviewByArticle = async (req, res, next) => {
  try {
    const articleId = req.query.articleId;
    const review = await reviewArticleServices.getReviewByArticle(articleId);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: review });
  } catch (error) {
    next(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

const getReviewBySlugArticle = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const review = await reviewArticleServices.getReviewBySlugArticle(slug);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: review });
  } catch (error) {
    next(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

const createReview = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { content, articleId } = req.body;
    const review = await reviewArticleServices.createReview({
      content,
      userId,
      articleId,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Xử lý thành công", content: review });
  } catch (error) {
    next(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const id = req.query.id;
    const review = await reviewArticleServices.deleteReview(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: review });
  } catch (error) {
    next(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

module.exports = {
  getAllReview,
  getReviewById,
  getReviewByArticle,
  createReview,
  getReviewBySlugArticle,
  deleteReview,
};

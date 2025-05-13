const { StatusCodes } = require("http-status-codes");
const reviewArticleServices = require("../services/reviewArticles");

const getAllReview = async (req, res, next) => {
  try {
    const reviews = await reviewArticleServices.getAllReview();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy danh sách đánh giá thành công",
      content: reviews,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đánh giá:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy danh sách đánh giá",
    });
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }
    const review = await reviewArticleServices.getReviewById(id);
    if (!review) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Đánh giá không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy đánh giá thành công",
      content: review,
    });
  } catch (error) {
    console.error("Lỗi khi lấy đánh giá theo ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy đánh giá theo ID",
    });
  }
};

const getReviewByArticle = async (req, res, next) => {
  try {
    const articleId = req.query.articleId;
    if (!articleId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Article ID không được để trống",
      });
    }
    const reviews = await reviewArticleServices.getReviewByArticle(articleId);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy đánh giá theo bài viết thành công",
      content: reviews,
    });
  } catch (error) {
    console.error("Lỗi khi lấy đánh giá theo bài viết:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy đánh giá theo bài viết",
    });
  }
};

const getReviewBySlugArticle = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    if (!slug) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Slug không được để trống",
      });
    }
    const reviews = await reviewArticleServices.getReviewBySlugArticle(slug);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy đánh giá theo slug bài viết thành công",
      content: reviews,
    });
  } catch (error) {
    console.error("Lỗi khi lấy đánh giá theo slug bài viết:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy đánh giá theo slug bài viết",
    });
  }
};

const createReview = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { content, articleId } = req.body;
    if (!content || !articleId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Nội dung và Article ID không được để trống",
      });
    }
    const review = await reviewArticleServices.createReview({
      content,
      userId,
      articleId,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo đánh giá thành công",
      content: review,
    });
  } catch (error) {
    console.error("Lỗi khi tạo đánh giá:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể tạo đánh giá",
    });
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }
    const deletedReview = await reviewArticleServices.deleteReview(id);
    if (!deletedReview) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Đánh giá không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa đánh giá thành công",
      content: deletedReview,
    });
  } catch (error) {
    console.error("Lỗi khi xóa đánh giá:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể xóa đánh giá",
    });
  }
};

module.exports = {
  getAllReview,
  getReviewById,
  getReviewByArticle,
  getReviewBySlugArticle,
  createReview,
  deleteReview,
};

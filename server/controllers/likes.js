const { StatusCodes } = require("http-status-codes");
const likeServices = require("../services/likes");

const getAllLikes = async (req, res, next) => {
  try {
    const likes = await likeServices.getAllLikes();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy danh sách lượt thích thành công",
      content: likes,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách lượt thích:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy danh sách lượt thích",
    });
  }
};

const getLikeByPostId = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID bài viết không được để trống",
      });
    }
    const likes = await likeServices.getLikeByPostId(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy lượt thích theo bài viết thành công",
      content: likes,
    });
  } catch (error) {
    console.error("Lỗi khi lấy lượt thích theo bài viết:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy lượt thích theo bài viết",
    });
  }
};

const getLikeBySlugArticle = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    if (!slug) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Slug bài viết không được để trống",
      });
    }
    const likes = await likeServices.getLikeBySlugArticle(slug);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy lượt thích theo slug bài viết thành công",
      content: likes,
    });
  } catch (error) {
    console.error("Lỗi khi lấy lượt thích theo slug bài viết:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy lượt thích theo slug bài viết",
    });
  }
};

const createLike = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { postId } = req.body;
    if (!postId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID bài viết không được để trống",
      });
    }
    const { message, newListLike } = await likeServices.createLike({
      userId,
      postId,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message,
      content: newListLike,
    });
  } catch (error) {
    console.error("Lỗi khi tạo lượt thích:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể tạo lượt thích",
    });
  }
};

const deleteLike = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID lượt thích không được để trống",
      });
    }
    const like = await likeServices.deleteLike(id);
    if (!like) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Lượt thích không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa lượt thích thành công",
      content: like,
    });
  } catch (error) {
    console.error("Lỗi khi xóa lượt thích:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể xóa lượt thích",
    });
  }
};

module.exports = {
  getAllLikes,
  getLikeByPostId,
  getLikeBySlugArticle,
  createLike,
  deleteLike,
};

const { StatusCodes } = require("http-status-codes");
const likeServices = require("../services/likes");

const getAllLikes = async (req, res, next) => {
  try {
    const likes = await likeServices.getAllLikes();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: likes });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getLikeByPostId = async (req, res, next) => {
  try {
    const id = req.query.id;
    const likes = await likeServices.getLikeByPostId(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: likes });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getLikeBySlugArticle = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const likes = await likeServices.getLikeBySlugArticle(slug);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: likes });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createLike = async (req, res, next) => {
  try {
    const userId = req.userId;
    // console.log(userId);

    const { postId } = req.body;
    const { message, newListLike } = await likeServices.createLike({
      userId,
      postId,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      content: newListLike,
      message,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteLike = async (req, res, next) => {
  try {
    const id = req.query.id;
    const like = await likeServices.deleteLike(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: like });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllLikes,
  getLikeByPostId,
  getLikeBySlugArticle,
  createLike,
  deleteLike,
};

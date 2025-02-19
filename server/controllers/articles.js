const { StatusCodes } = require("http-status-codes");
const articlesServices = require("../services/articles");
const customSlug = require("../utils/customSlug");

const getAllArticle = async (req, res, next) => {
  try {
    const article = await articlesServices.getAllArticle();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: article });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { title, content, categoryId, image } = req.body;
    const fileImage = req.file;
    // console.log(fileImage);
    const slug = customSlug(title);
    const article = await articlesServices.createArticle({
      title,
      image: fileImage?.path,
      content,
      slug,
      userId,
      categoryId,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Xử lý thành công", content: article });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const id = req.query.id;
    const article = await articlesServices.deleteArticle(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: article });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = {
  getAllArticle,
  createArticle,
  deleteArticle,
};

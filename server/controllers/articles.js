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

const getArticleById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const article = await articlesServices.getArticleById(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: article });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getArticleBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const { article, like, review } = await articlesServices.getArticleBySlug(
      slug
    );
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: article,
      like,
      comment: review,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getArticlesByCategory = async (req, res, next) => {
  try {
    const id = req.query.id;
    const article = await articlesServices.getArticlesByCategory(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: article });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getArticleByCategorySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const article = await articlesServices.getArticleByCategorySlug(slug);
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
    const { title, content, categoryId } = req.body;
    console.log(req.body);

    const fileImage = req.file;
    console.log(fileImage);

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

const updateCategoryIdArticle = async (req, res, next) => {
  try {
    const id = req.query.id;
    const { categoryId } = req.body;
    console.log(req.body);

    const article = await articlesServices.updateCategoryIdArticle(id, {
      categoryId,
    });
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: article });
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
  getArticleById,
  getArticleBySlug,
  getArticlesByCategory,
  getArticleByCategorySlug,
  createArticle,
  updateCategoryIdArticle,
  deleteArticle,
};

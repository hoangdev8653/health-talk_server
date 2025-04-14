const db = require("../models");
const reviewArticleServices = require("../services/reviewArticles");
const likeServices = require("../services/likes");
const { Op } = require("sequelize");

const getAllArticle = async () => {
  try {
    return await db.Articles.findAll({
      attributes: { exclude: ["userId", "categoryId"] },
      include: [
        {
          model: db.Categories,
          attributes: ["id", "name", "slug"],
        },
        {
          model: db.Users,
          attributes: ["id", "username", "email", "image"],
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

const getArticleById = async (id) => {
  try {
    const article = await db.Articles.findOne({
      where: { id },
      attributes: { exclude: ["userId", "categoryId"] },
      include: [
        {
          model: db.Categories,
          attributes: ["id", "name", "slug"],
        },
        {
          model: db.Users,
          attributes: ["id", "username", "email", "image"],
        },
      ],
    });
    if (!article) {
      throw new Error("Article không tồn tại");
    }
    return article;
  } catch (error) {
    console.log(error);
  }
};

const getArticleByUser = async (userId) => {
  try {
    console.log(userId);

    const articles = await db.Articles.findAll({
      where: { userId },
      attributes: { exclude: ["userId", "categoryId"] },
      include: [
        {
          model: db.Categories,
          attributes: ["id", "name", "slug"],
        },
        {
          model: db.Users,
          attributes: ["id", "username", "email", "image"],
        },
      ],
    });
    if (!articles) {
      return [];
    }
    return articles;
  } catch (error) {
    console.log(error);
  }
};

const getArticleBySlug = async (slug) => {
  try {
    const article = await db.Articles.findOne({
      where: { slug },
      attributes: { exclude: ["userId", "categoryId"] },
      include: [
        {
          model: db.Categories,
          attributes: ["id", "name"],
        },
        {
          model: db.Users,
          attributes: ["id", "username", "email", "image"],
        },
      ],
    });
    if (!article) {
      throw new Error("Article không tồn tại");
    }
    const review = await reviewArticleServices.getReviewByArticle(article.id);
    const like = await likeServices.getLikeByPostId(article.id);

    return { article, like, review };
  } catch (error) {
    console.log(error);
  }
};

const getArticlesByCategory = async (categoryId) => {
  try {
    return await db.Articles.findAll({
      where: { categoryId },
      attributes: { exclude: ["userId", "categoryId"] },
      include: [
        {
          model: db.Categories,
          attributes: ["id", "name", "slug"],
        },
        {
          model: db.Users,
          attributes: ["id", "username", "email", "image"],
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

const getArticleByCategorySlug = async (slug) => {
  try {
    const articles = await db.Articles.findAll({
      attributes: { exclude: ["userId", "categoryId"] },
      include: [
        {
          model: db.Categories,
          attributes: ["id", "name", "slug", "image"],
        },
        {
          model: db.Users,
          attributes: ["id", "username", "email", "image"],
        },
      ],
    });
    const article = articles.filter((item) => {
      return item.Category.slug == slug;
    });
    return article;
  } catch (error) {
    console.log(error);
  }
};

const getArticleByKey = async (title) => {
  try {
    const articles = await db.Articles.findAll({
      where: { title: { [Op.iLike]: `%${title}%` } },
    });
    const length = articles.length;
    return { articles, length };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createArticle = async ({
  title,
  content,
  image,
  slug,
  userId,
  categoryId,
}) => {
  try {
    return await db.Articles.create({
      title,
      content,
      image,
      slug,
      userId,
      categoryId,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCategoryIdArticle = async (id, { categoryId }) => {
  try {
    const article = await db.Articles.findOne({ where: { id } });
    if (!article) {
      throw new Error("Article không tồn tại");
    }
    await db.Articles.update({ categoryId }, { where: { id } });

    return await db.Articles.findOne({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};

const deleteArticle = async (id) => {
  try {
    const article = await db.Articles.findOne({ where: { id } });
    if (!article) {
      throw new Error("Article không tồn tại");
    }
    return await db.Articles.destroy({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllArticle,
  getArticleById,
  getArticleByUser,
  getArticleBySlug,
  getArticlesByCategory,
  getArticleByCategorySlug,
  getArticleByKey,
  createArticle,
  updateCategoryIdArticle,
  deleteArticle,
};

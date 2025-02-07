const db = require("../models");

const getAllArticle = async () => {
  try {
    return await db.Articles.findAll({
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
  } catch (error) {
    console.log(error);
  }
};

const createArticle = async ({ title, content, image, userId, categoryId }) => {
  try {
    return await db.Articles.create({
      title,
      content,
      image,
      userId,
      categoryId,
    });
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
  createArticle,
  deleteArticle,
};

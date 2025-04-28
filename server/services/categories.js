const { Op } = require("sequelize");
const db = require("../models");

const getAllCategories = async () => {
  try {
    return await db.Categories.findAll();
  } catch (error) {
    console.log(error);
  }
};

const getCategoryBykey = async (name) => {
  try {
    return await db.Categories.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createCategories = async ({ name, image, description, slug }) => {
  try {
    return await db.Categories.create({ name, image, description, slug });
  } catch (error) {
    console.log(error);
  }
};

const updateCategories = async ({ id, name, image, description, slug }) => {
  try {
    const category = await db.Categories.findOne({ where: { id } });
    if (!category) {
      throw new Error("Category không tồn tại");
    }
    return await db.Categories.update(
      { name, image, description, slug },
      { where: { id } }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteCategories = async (id) => {
  try {
    const category = await db.Categories.findOne({ where: { id } });
    if (!category) {
      throw new Error("Category không tồn tại");
    }
    return await db.Categories.destroy({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryBykey,
  createCategories,
  updateCategories,
  deleteCategories,
};

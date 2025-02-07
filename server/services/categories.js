const db = require("../models");

const getAllCategories = async () => {
  try {
    return await db.Categories.findAll();
  } catch (error) {
    console.log(error);
  }
};

const createCategories = async ({ name, image, description }) => {
  try {
    return await db.Categories.create({ name, image, description });
  } catch (error) {
    console.log(error);
  }
};

const updateCategories = async ({ id, name, image, description }) => {
  try {
    const category = await db.Categories.findOne({ where: { id } });
    if (!category) {
      throw new Error("Category không tồn tại");
    }
    return await db.Categories.update(
      { name, image, description },
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
  createCategories,
  updateCategories,
  deleteCategories,
};

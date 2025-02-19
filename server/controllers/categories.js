const { StatusCodes } = require("http-status-codes");
const categoriesServices = require("../services/categories");
const customSlug = require("../utils/customSlug");

const getAllCategories = async (req, res, next) => {
  try {
    const category = await categoriesServices.getAllCategories();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, messeage: "Xử lý thành công", content: category });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createCategories = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const fileImage = req.file;

    const slug = customSlug(name);
    const categories = await categoriesServices.createCategories({
      name,
      image: fileImage?.path,
      description,
      slug,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, messeage: "Xử lý thành công", content: categories });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCategories = async (req, res, next) => {
  try {
    const id = req.query.id;
    const categories = await categoriesServices.deleteCategories(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, messeage: "Xử lý thành công", content: categories });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllCategories,
  createCategories,
  deleteCategories,
};

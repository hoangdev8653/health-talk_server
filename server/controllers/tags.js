const tagServices = require("../services/tags");
const { StatusCodes } = require("http-status-codes");
const customSlug = require("../utils/customSlug");

const getAllTags = async (req, res, next) => {
  try {
    const tags = await tagServices.getAllTags();
    res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: tags });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getTagBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const tag = await tagServices.getTagBySlug(slug);
    res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: tag });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getTagById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const tag = await tagServices.getTagById(id);
    res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: tag });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createTag = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const slug = customSlug(title);
    const newTag = await tagServices.createTag({ title, content, slug });
    res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Xử lý thành công", content: newTag });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateTag = async (req, res, next) => {
  try {
    const id = req.query.id;
    const tag = req.body;
    const updatedTag = await tagServices.updateTag(id, tag);
    res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: updatedTag,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const id = req.query.id;
    const deletedTag = await tagServices.deleteTag(id);
    res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: deletedTag,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllTags,
  getTagById,
  getTagBySlug,
  createTag,
  updateTag,
  deleteTag,
};

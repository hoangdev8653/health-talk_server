const { StatusCodes } = require("http-status-codes");
const questionServices = require("../services/questions");
const customSlug = require("../utils/customSlug");

const getAllQuestions = async (req, res, next) => {
  try {
    const questions = await questionServices.getAllQuestions();
    res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: questions,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getQuestionById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const userId = req.userId || null;
    const isUser = !!userId;
    const question = await questionServices.getQuestionById(id, isUser);

    res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: question,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getQuestionBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const userId = req.userId || null;
    const isUser = !!userId;
    console.log(slug);

    const question = await questionServices.getQuestionBySlug(slug, isUser);
    res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: question });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getQuestionByTag = async (req, res, next) => {
  try {
    const id = req.query.id;
    const question = await questionServices.getQuestionByTag(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: question });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createQuestionTag = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.userId;
    const slug = customSlug(title);
    const newQuestion = await questionServices.createQuestionTag(userId, {
      title,
      content,
      slug,
      tags,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Xử lý thành công", content: newQuestion });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateQuestion = async (req, res, next) => {
  try {
    const id = req.query.id;
    const question = req.body;
    const updatedQuestion = await questionServices.updateQuestion(id, question);
    res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: updatedQuestion,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const id = req.query.id;
    const question = await questionServices.deleteQuestion(id);
    res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: question });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  getQuestionBySlug,
  getQuestionByTag,
  createQuestionTag,
  updateQuestion,
  deleteQuestion,
};

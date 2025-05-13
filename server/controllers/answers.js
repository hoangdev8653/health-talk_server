const { StatusCodes } = require("http-status-codes");
const answerServices = require("../services/answers");

const getAllAnswers = async (req, res, next) => {
  try {
    const answers = await answerServices.getAllAnswers();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: answers,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAnswerById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const answer = await answerServices.getAnswerById(id);
    res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: answer,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAnswerBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const answer = await answerServices.getAnswerBySlug(slug);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: answer });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createAnswer = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { content, questionId } = req.body

    const newAnswer = await answerServices.createAnswer(userId, {
      content,
      questionId,
    });
    res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Xử lý thành công",
      content: newAnswer,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateAnswer = async (req, res, next) => {
  try {
    const id = req.query.id;
    const answer = req.body;
    const updatedAnswer = await answerServices.updateAnswer(id, answer);
    res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: updatedAnswer,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteAnswer = async (req, res, next) => {
  try {
    const id = req.query.id;
    const deletedAnswer = await answerServices.deleteAnswer(id);
    res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: deletedAnswer,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllAnswers,
  getAnswerById,
  getAnswerBySlug,
  createAnswer,
  updateAnswer,
  deleteAnswer,
};

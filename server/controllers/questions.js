const { StatusCodes } = require("http-status-codes");
const questionServices = require("../services/questions");

const getAllQuestions = async (req, res, next) => {
  try {
    const questions = await questionServices.getAllQuestions();
    res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: questions });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getQuestionById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const question = await questionServices.getQuestionById(id);
    res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: question });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createQuestion = async (req, res, next) => {
  try {
    const question = req.body;
    const newQuestion = await questionServices.createQuestion(question);
    res
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
  createQuestion,
  updateQuestion,
  deleteQuestion,
};

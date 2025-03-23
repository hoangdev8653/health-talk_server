const { StatusCodes } = require("http-status-codes");
const questionServices = require("../services/questionServices");

const getAllQuestions = async (req, res, next) => {
  try {
    const questions = await questionServices.getAllQuestions();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: questions });
  } catch (error) {
    console.error(error);
    next(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

const getQuestionById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const question = await questionServices.getQuestionById(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: question });
  } catch (error) {
    console.error(error);
    next(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

const createQuestion = async (req, res, next) => {
  try {
    const { value } = req.body;
    const question = await questionServices.createQuestion(value);
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Xử lý thành công", content: question });
  } catch (error) {
    console.error(error);
    next(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const id = req.query.id;
    const question = await questionServices.deleteQuestion(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: question });
  } catch (error) {
    console.log(error);
    next(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

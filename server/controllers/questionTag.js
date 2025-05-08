const { StatusCodes } = require("http-status-codes");
const questionTagServices = require("../services/questionTag");

const getAllQuestionTags = async (req, res, next) => {
  try {
    const questionTags = await questionTagServices.getAllQuestionTags();
    res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: questionTags,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getByQuestionId = async (req, res, next) => {
  const questionId = req.query.questionId;
  try {
    const questionTags = await questionTagServices.getByQuestionId(questionId);
    res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: questionTags,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getQuestionTagById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const questionTag = await questionTagServices.getQuestionTagById(id);
    res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: questionTag,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createQuestionTag = async (req, res, next) => {
  try {
    const { questionId, tagId } = req.body;
    const newQuestionTag = await questionTagServices.createQuestionTag({
      questionId,
      tagId,
    });
    res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Xử lý thành công",
      content: newQuestionTag,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateQuestionTag = async (req, res, next) => {
  try {
    const id = req.query.id;
    const questionTag = req.body;
    const updatedQuestionTag = await questionTagServices.updateQuestionTag(
      id,
      questionTag
    );
    res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: updatedQuestionTag,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteQuestionTag = async (req, res, next) => {
  try {
    const id = req.query.id;
    const deletedQuestionTag = await questionTagServices.deleteQuestionTag(id);
    res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: deletedQuestionTag,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllQuestionTags,
  getQuestionTagById,
  getByQuestionId,
  createQuestionTag,
  updateQuestionTag,
  deleteQuestionTag,
};

const { StatusCodes } = require("http-status-codes");
const questionTagServices = require("../services/questionTag");

const getAllQuestionTags = async (req, res, next) => {
  try {
    const questionTags = await questionTagServices.getAllQuestionTags();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy danh sách QuestionTags thành công",
      content: questionTags,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách QuestionTags:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy danh sách QuestionTags",
    });
  }
};

const getByQuestionId = async (req, res, next) => {
  try {
    const questionId = req.query.questionId;
    if (!questionId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Question ID không được để trống",
      });
    }
    const questionTags = await questionTagServices.getByQuestionId(questionId);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy QuestionTags theo Question ID thành công",
      content: questionTags,
    });
  } catch (error) {
    console.error("Lỗi khi lấy QuestionTags theo Question ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy QuestionTags theo Question ID",
    });
  }
};

const getQuestionTagById = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }
    const questionTag = await questionTagServices.getQuestionTagById(id);
    if (!questionTag) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "QuestionTag không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy QuestionTag thành công",
      content: questionTag,
    });
  } catch (error) {
    console.error("Lỗi khi lấy QuestionTag theo ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy QuestionTag theo ID",
    });
  }
};

const createQuestionTag = async (req, res, next) => {
  try {
    const { questionId, tagId } = req.body;
    if (!questionId || !tagId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Question ID và Tag ID không được để trống",
      });
    }
    const newQuestionTag = await questionTagServices.createQuestionTag({
      questionId,
      tagId,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo QuestionTag thành công",
      content: newQuestionTag,
    });
  } catch (error) {
    console.error("Lỗi khi tạo QuestionTag:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể tạo QuestionTag",
    });
  }
};

const updateQuestionTag = async (req, res, next) => {
  try {
    const id = req.query.id;
    const questionTag = req.body;
    if (!id || !questionTag) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID và dữ liệu cập nhật không được để trống",
      });
    }
    const updatedQuestionTag = await questionTagServices.updateQuestionTag(
      id,
      questionTag
    );
    if (!updatedQuestionTag) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "QuestionTag không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật QuestionTag thành công",
      content: updatedQuestionTag,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật QuestionTag:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể cập nhật QuestionTag",
    });
  }
};

const deleteQuestionTag = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }
    const deletedQuestionTag = await questionTagServices.deleteQuestionTag(id);
    if (!deletedQuestionTag) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "QuestionTag không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa QuestionTag thành công",
      content: deletedQuestionTag,
    });
  } catch (error) {
    console.error("Lỗi khi xóa QuestionTag:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể xóa QuestionTag",
    });
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

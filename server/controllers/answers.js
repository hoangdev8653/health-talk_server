const { StatusCodes } = require("http-status-codes");
const answerServices = require("../services/answers");

const getAllAnswers = async (req, res, next) => {
  try {
    const answers = await answerServices.getAllAnswers();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy danh sách câu trả lời thành công",
      content: answers,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách câu trả lời:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy danh sách câu trả lời",
    });
  }
};

const getAnswerById = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }
    const answer = await answerServices.getAnswerById(id);
    if (!answer) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Câu trả lời không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy câu trả lời thành công",
      content: answer,
    });
  } catch (error) {
    console.error("Lỗi khi lấy câu trả lời theo ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy câu trả lời theo ID",
    });
  }
};

const getAnswerBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    if (!slug) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Slug không được để trống",
      });
    }
    const answer = await answerServices.getAnswerBySlug(slug);
    if (!answer) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Câu trả lời không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy câu trả lời thành công",
      content: answer,
    });
  } catch (error) {
    console.error("Lỗi khi lấy câu trả lời theo slug:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy câu trả lời theo slug",
    });
  }
};

const createAnswer = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { content, questionId } = req.body;

    if (!content || !questionId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Nội dung và ID câu hỏi không được để trống",
      });
    }

    const newAnswer = await answerServices.createAnswer(userId, {
      content,
      questionId,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo câu trả lời thành công",
      content: newAnswer,
    });
  } catch (error) {
    console.error("Lỗi khi tạo câu trả lời:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể tạo câu trả lời",
    });
  }
};

const updateAnswer = async (req, res, next) => {
  try {
    const id = req.query.id;
    const answer = req.body;

    if (!id || !answer) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID và dữ liệu cập nhật không được để trống",
      });
    }

    const updatedAnswer = await answerServices.updateAnswer(id, answer);
    if (!updatedAnswer) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Câu trả lời không tồn tại",
      });
    }

    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật câu trả lời thành công",
      content: updatedAnswer,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật câu trả lời:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể cập nhật câu trả lời",
    });
  }
};

const deleteAnswer = async (req, res, next) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }

    const deletedAnswer = await answerServices.deleteAnswer(id);
    if (!deletedAnswer) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Câu trả lời không tồn tại",
      });
    }

    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa câu trả lời thành công",
      content: deletedAnswer,
    });
  } catch (error) {
    console.error("Lỗi khi xóa câu trả lời:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể xóa câu trả lời",
    });
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

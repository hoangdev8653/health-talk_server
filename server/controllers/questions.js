const { StatusCodes } = require("http-status-codes");
const questionServices = require("../services/questions");
const customSlug = require("../utils/customSlug");

const getAllQuestions = async (req, res, next) => {
  try {
    const questions = await questionServices.getAllQuestions();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy danh sách câu hỏi thành công",
      content: questions,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách câu hỏi:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy danh sách câu hỏi",
    });
  }
};

const getQuestionById = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }
    const userId = req.userId || null;
    const isUser = !!userId;
    const question = await questionServices.getQuestionById(id, isUser);
    if (!question) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Câu hỏi không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy câu hỏi thành công",
      content: question,
    });
  } catch (error) {
    console.error("Lỗi khi lấy câu hỏi theo ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy câu hỏi theo ID",
    });
  }
};

const getQuestionBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    if (!slug) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Slug không được để trống",
      });
    }
    const question = await questionServices.getQuestionBySlug(slug);
    if (!question) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Câu hỏi không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy câu hỏi thành công",
      content: question,
    });
  } catch (error) {
    console.error("Lỗi khi lấy câu hỏi theo slug:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy câu hỏi theo slug",
    });
  }
};

const getQuestionByTag = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Tag ID không được để trống",
      });
    }
    const question = await questionServices.getQuestionByTag(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy câu hỏi theo tag thành công",
      content: question,
    });
  } catch (error) {
    console.error("Lỗi khi lấy câu hỏi theo tag:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy câu hỏi theo tag",
    });
  }
};

const createQuestionTag = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content || !tags) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Tiêu đề, nội dung và tags không được để trống",
      });
    }
    const userId = req.userId;
    const slug = customSlug(title);
    const newQuestion = await questionServices.createQuestionTag(userId, {
      title,
      content,
      slug,
      tags,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo câu hỏi thành công",
      content: newQuestion,
    });
  } catch (error) {
    console.error("Lỗi khi tạo câu hỏi:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể tạo câu hỏi",
    });
  }
};

const updateQuestion = async (req, res, next) => {
  try {
    const id = req.query.id;
    const question = req.body;
    if (!id || !question) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID và dữ liệu cập nhật không được để trống",
      });
    }
    const updatedQuestion = await questionServices.updateQuestion(id, question);
    if (!updatedQuestion) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Câu hỏi không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật câu hỏi thành công",
      content: updatedQuestion,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật câu hỏi:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể cập nhật câu hỏi",
    });
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }
    const question = await questionServices.deleteQuestion(id);
    if (!question) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Câu hỏi không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa câu hỏi thành công",
      content: question,
    });
  } catch (error) {
    console.error("Lỗi khi xóa câu hỏi:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể xóa câu hỏi",
    });
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

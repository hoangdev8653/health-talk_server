const tagServices = require("../services/tags");
const { StatusCodes } = require("http-status-codes");
const customSlug = require("../utils/customSlug");

const getAllTags = async (req, res, next) => {
  try {
    const tags = await tagServices.getAllTags();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy danh sách thẻ thành công",
      content: tags,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thẻ:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy danh sách thẻ",
    });
  }
};

const getTagBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const tag = await tagServices.getTagBySlug(slug);
    if (!tag) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Thẻ không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy thẻ thành công",
      content: tag,
    });
  } catch (error) {
    console.error("Lỗi khi lấy thẻ theo slug:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy thẻ theo slug",
    });
  }
};

const getTagById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const tag = await tagServices.getTagById(id);
    if (!tag) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Thẻ không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy thẻ thành công",
      content: tag,
    });
  } catch (error) {
    console.error("Lỗi khi lấy thẻ theo ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy thẻ theo ID",
    });
  }
};

const createTag = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Tiêu đề và nội dung không được để trống",
      });
    }
    const slug = customSlug(title);
    const newTag = await tagServices.createTag({ title, content, slug });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo thẻ thành công",
      content: newTag,
    });
  } catch (error) {
    console.error("Lỗi khi tạo thẻ:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể tạo thẻ",
    });
  }
};

const updateTag = async (req, res, next) => {
  try {
    const id = req.query.id;
    const tag = req.body;
    if (!id || !tag) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID và dữ liệu cập nhật không được để trống",
      });
    }
    const updatedTag = await tagServices.updateTag(id, tag);
    if (!updatedTag) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Thẻ không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật thẻ thành công",
      content: updatedTag,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật thẻ:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể cập nhật thẻ",
    });
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }
    const deletedTag = await tagServices.deleteTag(id);
    if (!deletedTag) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Thẻ không tồn tại",
      });
    }
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa thẻ thành công",
      content: deletedTag,
    });
  } catch (error) {
    console.error("Lỗi khi xóa thẻ:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể xóa thẻ",
    });
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

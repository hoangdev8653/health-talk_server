const { StatusCodes } = require("http-status-codes");
const postcardServices = require("../services/postcard");

const getAllPostcard = async (req, res, next) => {
  try {
    const postcards = await postcardServices.getAllPostcard();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy danh sách postcard thành công",
      content: postcards,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách postcard:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy danh sách postcard",
    });
  }
};

const createPostcard = async (req, res, next) => {
  try {
    const { title, decription } = req.body;
    const fileVideo = req.files?.["video_url"]?.[0] || null;
    const fileImage = req.files?.["image"]?.[0] || null;

    if (!fileVideo && !fileImage) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Không có tệp nào được tải lên",
      });
    }

    const postcard = await postcardServices.createPostcard({
      title,
      decription,
      video_url: fileVideo?.path,
      image: fileImage?.path,
    });

    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo postcard thành công",
      content: postcard,
    });
  } catch (error) {
    console.error("Lỗi khi tạo postcard:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể tạo postcard",
    });
  }
};

const updatePostcard = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }

    const { title, description } = req.body;
    const fileVideo = req.files?.["video_url"]?.[0] || null;
    const fileImage = req.files?.["image"]?.[0] || null;

    const updatedPostcard = await postcardServices.updatePostcard({
      id,
      title,
      description,
      video_url: fileVideo?.path,
      image: fileImage?.path,
    });

    if (!updatedPostcard) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Postcard không tồn tại",
      });
    }

    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật postcard thành công",
      content: updatedPostcard,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật postcard:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể cập nhật postcard",
    });
  }
};

const deletePostcard = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }

    const deletedPostcard = await postcardServices.deletePostcard(id);
    if (!deletedPostcard) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Postcard không tồn tại",
      });
    }

    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa postcard thành công",
      content: deletedPostcard,
    });
  } catch (error) {
    console.error("Lỗi khi xóa postcard:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể xóa postcard",
    });
  }
};

module.exports = {
  getAllPostcard,
  createPostcard,
  updatePostcard,
  deletePostcard,
};

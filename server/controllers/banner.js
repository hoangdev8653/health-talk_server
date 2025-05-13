const { StatusCodes } = require("http-status-codes");
const bannerServices = require("../services/banner");
const customSlug = require("../utils/customSlug");

const getAllBanner = async (req, res, next) => {
  try {
    const banners = await bannerServices.getAllBanner();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Lấy danh sách banner thành công",
      content: banners,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách banner:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể lấy danh sách banner",
    });
  }
};

const createBanner = async (req, res, next) => {
  try {
    const { title } = req.body;
    const fileImage = req.file;

    if (!title || !fileImage) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "Tiêu đề và hình ảnh không được để trống",
      });
    }

    const slug = customSlug(title);
    const banner = await bannerServices.createBanner({
      title,
      image: fileImage.path,
      slug,
    });

    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo banner thành công",
      content: banner,
    });
  } catch (error) {
    console.error("Lỗi khi tạo banner:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể tạo banner",
    });
  }
};

const deleteBanner = async (req, res, next) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 400,
        message: "ID không được để trống",
      });
    }

    const banner = await bannerServices.deleteBanner(id);

    if (!banner) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 404,
        message: "Banner không tồn tại",
      });
    }

    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa banner thành công",
      content: banner,
    });
  } catch (error) {
    console.error("Lỗi khi xóa banner:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 500,
      message: "Không thể xóa banner",
    });
  }
};

module.exports = {
  getAllBanner,
  createBanner,
  deleteBanner,
};

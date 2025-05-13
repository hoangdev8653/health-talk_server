const { StatusCodes } = require("http-status-codes");
const bannerServices = require("../services/banner");
const customSlug = require("../utils/customSlug");

const getAllBanner = async (req, res, next) => {
  try {
    const banner = await bannerServices.getAllBanner();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: banner });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createBanner = async (req, res, next) => {
  try {
    const { title } = req.body;
    const fileImage = req.file;
    console.log(fileImage);
    console.log(typeof title);
    const slug = customSlug(title);
    const banner = await bannerServices.createBanner({
      title,
      image: fileImage?.path,
      slug,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Xử lý thành công", content: banner });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteBanner = async (req, res, next) => {
  try {
    const id = req.query.id;
    console.log(id);

    const banner = await bannerServices.deleteBanner(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: banner });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllBanner,
  createBanner,
  deleteBanner,
};

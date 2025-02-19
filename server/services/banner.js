const db = require("../models");

const getAllBanner = async () => {
  try {
    return await db.Banners.findAll();
  } catch (error) {
    console.log(error);
  }
};

const createBanner = async ({ title, image, slug }) => {
  try {
    return await db.Banners.create({
      title,
      image,
      slug,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteBanner = async (id) => {
  try {
    const banner = await db.Banners.findOne({ where: { id } });
    if (!banner) {
      throw new Error("Banner không tồn tại");
    }
    return await db.Banners.destroy({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllBanner,
  createBanner,
  deleteBanner,
};

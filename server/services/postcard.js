const db = require("../models");

const getAllPostcard = async () => {
  try {
    return await db.Postcards.findAll();
  } catch (error) {
    console.log(error);
  }
};

const createPostcard = async ({ title, decription, video_url, image }) => {
  try {
    return await db.Postcards.create({ title, decription, video_url, image });
  } catch (error) {
    console.log(error);
  }
};

const updatePostcard = async ({ id, title, decription, video_url }) => {
  try {
    const postcard = await db.Postcards.findOne({ where: { id } });
    if (!postcard) {
      throw new Error("Postcard không tồn tại");
    }
    return await db.Postcards.update(
      { title, decription, video_url },
      { where: { id } }
    );
  } catch (error) {
    console.log(error);
  }
};

const deletePostcard = async (id) => {
  try {
    console.log(id);
    const postcard = await db.Postcards.findOne({ where: { id } });
    if (!postcard) {
      throw new Error("Postcard không tồn tại");
    }
    return await db.Postcards.destroy({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPostcard,
  createPostcard,
  updatePostcard,
  deletePostcard,
};

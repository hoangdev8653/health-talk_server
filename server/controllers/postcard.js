const { StatusCodes } = require("http-status-codes");
const postcardServices = require("../services/postcard");

const getAllPostcard = async (req, res, next) => {
  try {
    const postcard = await postcardServices.getAllPostcard();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, messeage: "Xử lý thành công", content: postcard });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createPostcard = async (req, res, next) => {
  try {
    const { title, decription } = req.body;
    const fileVideo = req.file; 
    console.log(fileVideo);
    if (!fileVideo) {
      return res.status(400).json({ message: "No video file uploaded" });
    }
    const postcard = await postcardServices.createPostcard({
      title,
      decription,
      video_url: fileVideo?.path,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, messeage: "Xử lý thành công", content: postcard });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updatePostcard = async (req, res, next) => {
  try {
    const  id  = req.query.id;

    const { title, decription, video_url } = req.body;
    const fileAudio = req.file;

    const postcard = await postcardServices.updatePostcard({
      id,
      title,
      decription,
      video_url: fileAudio?.path,
    });
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, messeage: "Xử lý thành công", content: postcard });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deletePostcard = async (req, res, next) => {
  try {
    const  id  = req.query.id;
    const postcard = await postcardServices.deletePostcard( id );
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, messeage: "Xử lý thành công", content: postcard });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllPostcard,
  createPostcard,
  updatePostcard,
  deletePostcard
};

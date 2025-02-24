const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "health-talk",
      resource_type: "auto",
      allowedFormats: ["jpeg", "png", "jpg", "mp3", "webp"],
    };
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;

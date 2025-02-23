const express = require("express");
const router = express.Router();
const uploadCloud = require("../middlewares/cloudinary");
const postcardControllers = require("../controllers/postcard");

router.route("/").get(postcardControllers.getAllPostcard);
router.route("/create").post(
  uploadCloud.fields([
    { name: "video_url", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  postcardControllers.createPostcard
);
router.route("/delete").delete(postcardControllers.deletePostcard);

module.exports = router;

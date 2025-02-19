const express = require("express");
const router = express.Router();
const uploadCloud = require("../middlewares/cloudinary");

const bannerControllers = require("../controllers/banner");

router.route("/").get(bannerControllers.getAllBanner);
router
  .route("/create")
  .post(uploadCloud.single("image"), bannerControllers.createBanner);
router.route("delete").delete(bannerControllers.deleteBanner);

module.exports = router;

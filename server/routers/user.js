const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const validateToken = require("../middlewares/auth");
const uploadCloud = require("../middlewares/cloudinary");

router.route("/").get(userControllers.getAllUser);
router.route("/getById").get(userControllers.getUserById);
router
  .route("/updateAvatar")
  .post(
    uploadCloud.single("image"),
    validateToken,
    userControllers.updateAvatar
  );
router.route("/dang-ki").post(userControllers.register);
router.route("/dang-nhap").post(userControllers.login);
router.route("/refreshToken").post(userControllers.refreshToken);

module.exports = router;

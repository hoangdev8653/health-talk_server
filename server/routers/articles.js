const express = require("express");
const router = express.Router();
const uploadCloud = require("../middlewares/cloudinary");
import validateToken from "../middlewares/auth";

const articlesControllers = require("../controllers/articles");

router.route("/").get(articlesControllers.getAllArticle);
router
  .route("/create")
  .post(
    uploadCloud.single("image"),
    validateToken,
    articlesControllers.createArticle
  );
router.route("/delete").delete(articlesControllers.deleteArticle);

module.exports = router;

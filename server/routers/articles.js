const express = require("express");
const router = express.Router();
const uploadCloud = require("../middlewares/cloudinary");
import validateToken from "../middlewares/auth";

const articlesControllers = require("../controllers/articles");

router.route("/").get(articlesControllers.getAllArticle);
router.route("/byId").get(articlesControllers.getArticleById);
router.route("/:slug").get(articlesControllers.getArticleBySlug);
router.route("/byCategory").get(articlesControllers.getArticlesByCategory);
router
  .route("/byCategory/:slug")
  .get(articlesControllers.getArticleByCategorySlug);
router
  .route("/create")
  .post(
    uploadCloud.single("image"),
    validateToken,
    articlesControllers.createArticle
  );
router.route("/update").put(articlesControllers.updateCategoryIdArticle);

router.route("/delete").delete(articlesControllers.deleteArticle);

module.exports = router;

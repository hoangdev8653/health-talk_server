const express = require("express");
const router = express.Router();

const reviewArticlesControllers = require("../controllers/reviewArticles");
const validateToken = require("../middlewares/auth");

router.route("/").get(reviewArticlesControllers.getAllReview);
router.route("/getById").get(reviewArticlesControllers.getReviewById);
router.route("/getByArticle").get(reviewArticlesControllers.getReviewByArticle);
router.route("/:slug").get(reviewArticlesControllers.getReviewBySlugArticle);
router
  .route("/create")
  .post(validateToken, reviewArticlesControllers.createReview);
router.route("/delete").delete(reviewArticlesControllers.deleteReview);

module.exports = router;

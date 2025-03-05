const express = require("express");
const router = express.Router();

const reviewArticlesControllers = require("../controllers/reviewArticles");
const validateToken = require("../middlewares/auth");

router.route("/").get(reviewArticlesControllers.getAllReview);
router
  .route("/getByUser")
  .get(validateToken, reviewArticlesControllers.getReviewById);
router
  .route("/create")
  .post(validateToken, reviewArticlesControllers.createReview);
router.route("/delete").delete(reviewArticlesControllers.deleteReview);

module.exports = router;

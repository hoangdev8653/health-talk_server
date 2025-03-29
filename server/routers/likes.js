const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likes");
const validateToken = require("../middlewares/auth");

router.route("/").get(likeController.getAllLikes);
router.route("/byPost").get(likeController.getLikeByPostId);
router.route("/:slug").get(likeController.getLikeBySlugArticle);
router.route("/create").post(validateToken, likeController.createLike);
router.route("/delete").delete(likeController.deleteLike);

module.exports = router;

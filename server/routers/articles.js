const express = require("express");
const router = express.Router();
const  uploadCloud  = require("../middlewares/cloudinary");

const articlesControllers = require("../controllers/articles")

router.route("/").get(articlesControllers.getAllArticle)
router.route("/create").post(uploadCloud.single("image"),articlesControllers.createArticle)
router.route("/delete").delete(articlesControllers.deleteArticle)

module.exports = router
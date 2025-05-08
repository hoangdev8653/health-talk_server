const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tags");

router.route("/").get(tagController.getAllTags);
router.route("/getById").get(tagController.getTagById);
router.route("/:slug").get(tagController.getTagBySlug);
router.route("/create").post(tagController.createTag);
router.route("/update").put(tagController.updateTag);
router.route("/delete").delete(tagController.deleteTag);

module.exports = router;

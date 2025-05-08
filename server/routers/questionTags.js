const express = require("express");
const router = express.Router();
const questionTagController = require("../controllers/questionTag");

router.route("/").get(questionTagController.getAllQuestionTags);
router.route("/getById").get(questionTagController.getQuestionTagById);
router.route("/getByQuestionId").get(questionTagController.getByQuestionId);
router.route("/create").post(questionTagController.createQuestionTag);
router.route("/update").put(questionTagController.updateQuestionTag);
router.route("/delete").put(questionTagController.deleteQuestionTag);

module.exports = router;

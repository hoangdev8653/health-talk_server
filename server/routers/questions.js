const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questions");

router.route("/").get(questionController.getAllQuestions);
router.route("/getById").get(questionController.getQuestionById);
router.route("/create").post(questionController.createQuestion);
router.route("/update").put(questionController.updateQuestion);
router.route("/delete").delete(questionController.deleteQuestion);

module.exports = router;

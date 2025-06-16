const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questions");
const validateToken = require("../middlewares/auth");

router.route("/").get(questionController.getAllQuestions);
router.route("/getById").get(validateToken, questionController.getQuestionById);
router.route("/getByTag").get(questionController.getQuestionByTag);
router.route("/:slug").get(questionController.getQuestionBySlug);
router
  .route("/createQuestionTag")
  .post(validateToken, questionController.createQuestionTag);
router.route("/update").put(questionController.updateQuestion);
router.route("/delete").delete(questionController.deleteQuestion);

module.exports = router;

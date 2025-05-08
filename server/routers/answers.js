const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answers");
const validateToken = require("../middlewares/auth");

router.route("/").get(answerController.getAllAnswers);
router.route("/getById").get(answerController.getAnswerById);
router.route("/:slug").get(answerController.getAnswerBySlug);
router.route("/create").post(validateToken, answerController.createAnswer);
router.route("/update").put(answerController.updateAnswer);
router.route("/delete").delete(answerController.deleteAnswer);

module.exports = router;

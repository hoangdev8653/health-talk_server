const db = require("../models");

const getAllQuestions = async () => {
  return await db.Questions.findAll();
};

const getQuestionById = async (id) => {
  const checkId = await db.Questions.findOne({ where: { id } });
  if (!checkId) {
    throw new Error("Question not found");
  }
  return checkId;
};

const createQuestion = async (question) => {
  const newQuestion = await db.Questions.create(question);
  return newQuestion;
};

const updateQuestion = async (id, question) => {
  const checkId = await db.Questions.findOne({ where: { id } });
  if (!checkId) {
    throw new Error("Question not found");
  }
  const updatedQuestion = await db.Questions.update(question, {
    where: { id },
  });
  return updatedQuestion;
};

const deleteQuestion = async (id) => {
  const checkId = await db.Questions.findOne({ where: { id } });
  if (!checkId) {
    throw new Error("Question not found");
  }
  const deletedQuestion = await db.Questions.destroy({ where: { id } });
  return deletedQuestion;
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};

const db = require("../models");

const getAllAnswers = async () => {
  const answers = await db.Answers.findAll({
    attributes: { exclude: ["userId", "questionId"] },
    include: [
      {
        model: db.Questions,
        attributes: ["title", "content", "views", "slug"],
      },
      {
        model: db.Users,
        attributes: ["id", "username", "email", "image"],
      },
    ],
  });
  return answers;
};

const getAnswerById = async (id) => {
  const answer = await db.Answers.findByPk(id);
  if (!answer) {
    throw new Error("Answer not found");
  }
  return answer;
};

const getAnswerBySlug = async (slug) => {
  try {
    const answers = await db.Answers.findAll({
      attributes: { exclude: ["userId", "questionId"] },
      include: [
        {
          model: db.Questions,
          attributes: ["title", "content", "views", "slug"],
        },
        {
          model: db.Users,
          attributes: ["id", "username", "email", "image"],
        },
      ],
    });
    const filterAnswers = answers.filter((item) => item.Question.slug == slug);
    return filterAnswers;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createAnswer = async (userId, { content, questionId }) => {
  const newAnswer = await db.Answers.create({ userId, content, questionId });
  return newAnswer;
};

const updateAnswer = async (id, answer) => {
  const updatedAnswer = await db.Answers.update(answer, { where: { id } });
  if (!updatedAnswer) {
    throw new Error("Answer not found or update failed");
  }
  return updatedAnswer;
};

const deleteAnswer = async (id) => {
  const deletedAnswer = await db.Answers.destroy({ where: { id } });
  if (!deletedAnswer) {
    throw new Error("Answer not found or delete failed");
  }
  return deletedAnswer;
};

module.exports = {
  getAllAnswers,
  getAnswerById,
  getAnswerBySlug,
  createAnswer,
  updateAnswer,
  deleteAnswer,
};

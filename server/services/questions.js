const db = require("../models");

const getAllQuestions = async () => {
  const questions = await db.Questions.findAll({
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: db.Tags,
        as: "tags",
        attributes: ["id", "title", "slug"],
        through: { attributes: [] },
      },
      {
        model: db.Users,
        attributes: ["id", "username", "email", "image"],
      },
    ],
  });
  return questions;
};

const getQuestionById = async (id, isUser) => {
  console.log(id);
  console.log(isUser);
  if (isUser) {
    const questionData = await db.Questions.findOne({ where: { id } });

    if (!questionData) {
      throw new Error("Question not found");
    }
    await db.Questions.update(
      { views: questionData.views + 1 },
      { where: { id } }
    );
  }
  const checkId = await db.Questions.findOne({
    where: { id },
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: db.Tags,
        as: "tags",
        attributes: ["id", "title", "slug"],
        through: { attributes: [] },
      },
      {
        model: db.Users,
        attributes: ["id", "username", "email", "image"],
      },
    ],
  });

  if (!checkId) {
    throw new Error("Question not found");
  }

  return checkId;
};

const getQuestionBySlug = async (slug, isUser) => {
  const questionData = await db.Questions.findOne({ where: { slug } });
  if (!questionData) {
    throw new Error("Question not found");
  }
  if (isUser) {
    await db.Questions.update(
      { views: questionData.views + 1 },
      { where: { slug } }
    );
  }
  const checkSlug = await db.Questions.findOne({
    where: { slug },
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: db.Tags,
        as: "tags",
        attributes: ["id", "title", "slug"],
        through: { attributes: [] },
      },
      {
        model: db.Users,
        attributes: ["id", "username", "email", "image"],
      },
    ],
  });

  return checkSlug;
};

const getQuestionByTag = async (tagId) => {
  try {
    const questions = await db.Questions.findAll({
      attributes: { exclude: ["userId"] },
      include: [
        {
          model: db.Tags,
          as: "tags",
          attributes: ["id", "title", "slug"],
          through: { attributes: [] },
        },
        {
          model: db.Users,
          attributes: ["id", "username", "email", "image"],
        },
      ],
    });
    const filteredQuestions = questions.filter((question) =>
      question.tags.some((tag) => tag.id === tagId)
    );
    return filteredQuestions;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createQuestionTag = async (userId, { title, content, slug, tags }) => {
  try {
    const newQuestion = await db.Questions.create({
      userId,
      title,
      content,
      slug,
    });
    for (const tagId of tags) {
      const a = await db.QuestionTags.findOrCreate({
        where: {
          questionId: newQuestion.id,
          tagId: tagId,
        },
      });
    }

    const questionWithTags = await db.Questions.findOne({
      where: { id: newQuestion.id },
      include: [
        {
          model: db.Tags,
          as: "tags",
          through: { attributes: [] },
          attributes: ["id", "title", "slug"],
        },
      ],
    });
    return questionWithTags;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating question tag");
  }
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
  getQuestionBySlug,
  getQuestionByTag,
  createQuestionTag,
  updateQuestion,
  deleteQuestion,
};

const db = require("../models");

const getAllQuestionTags = async () => {
  const questionTags = await db.QuestionTags.findAll({
    attributes: { exclude: ["questionId", "tagId"] },
    include: [
      {
        model: db.Questions,
        as: "questions",
        // attributes: ["id", "title", "content, slug, views"],
      },
      {
        model: db.Tags,
        as: "tags",
        attributes: ["id", "title", "content", "slug"],
      },
    ],
  });
  return questionTags;
};

const getQuestionTagById = async (id) => {
  const questionTag = await db.QuestionTags.findByPk(id, {
    include: [
      {
        model: db.Tags,
        as: "tags",
        attributes: ["id", "title", "slug"],
        through: { attributes: [] },
      },
    ],
  });
  if (!questionTag) {
    throw new Error("QuestionTag not found");
  }
  return questionTag;
};

const getByQuestionId = async (questionId) => {
  try {
    const questionTag = await db.QuestionTags.findAll({
      where: { questionId },
      include: [
        {
          model: db.Questions,
          as: "questions",
          attributes: ["id", "title", "content", "slug", "views"], // chỉ chọn field cần thiết
        },
        {
          model: db.Tags,
          as: "tags",
          attributes: ["id", "title", "content", "slug"],
        },
      ],
      attributes: {
        exclude: ["questionId", "tagId"],
      },
    });
    return questionTag;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createQuestionTag = async (questionTag) => {
  const newQuestionTag = await db.QuestionTags.create(questionTag);
  return newQuestionTag;
};

const updateQuestionTag = async (id, questionTag) => {
  const updatedQuestionTag = await db.QuestionTags.update(questionTag, {
    where: { id },
  });
  if (!updatedQuestionTag) {
    throw new Error("QuestionTag not found or update failed");
  }
  return updatedQuestionTag;
};

const deleteQuestionTag = async (id) => {
  const deletedQuestionTag = await db.QuestionTags.destroy({ where: { id } });
  if (!deletedQuestionTag) {
    throw new Error("QuestionTag not found or delete failed");
  }
  return deletedQuestionTag;
};

module.exports = {
  getAllQuestionTags,
  getQuestionTagById,
  getByQuestionId,
  createQuestionTag,
  updateQuestionTag,
  deleteQuestionTag,
};

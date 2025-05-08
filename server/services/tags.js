const db = require("../models");

const getAllTags = async () => {
  const tags = await db.Tags.findAll();
  return tags;
};

const getTagById = async (id) => {
  const tag = await db.Tags.findOne({ where: { id } });
  if (!tag) {
    throw new Error("Tag not found");
  }
  return tag;
};

const getTagBySlug = async (slug) => {
  const tag = await db.Tags.findOne({ where: { slug } });
  if (!tag) {
    throw new Error("Tag not found");
  }
  return tag;
};

const createTag = async ({ title, content, slug }) => {
  const newTag = await db.Tags.create({ title, content, slug });
  return newTag;
};

const updateTag = async (id, tag) => {
  const updatedTag = await db.Tags.update(tag, { where: { id } });
  if (!updatedTag) {
    throw new Error("Tag not found or update failed");
  }
  return updatedTag;
};

const deleteTag = async (id) => {
  const deletedTag = await db.Tags.destroy({ where: { id } });
  if (!deletedTag) {
    throw new Error("Tag not found or delete failed");
  }
  return deletedTag;
};

module.exports = {
  getAllTags,
  getTagById,
  getTagBySlug,
  createTag,
  updateTag,
  deleteTag,
};

const slugify = require("slugify");

function customSlug(str) {
  return slugify(str, {
    lower: true,
    strict: true,
  });
}

module.exports = customSlug;

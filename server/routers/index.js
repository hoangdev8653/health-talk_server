const userRouter = require("./user");
const postcardRouter = require("./postcard");
const categoriesRouter = require("./categories");
const articlesRouter = require("./articles");
const bannerRouter = require("./banner");
const reviewArticlesRouter = require("./reviewArticles");

const routers = {
  user: userRouter,
  postcard: postcardRouter,
  categories: categoriesRouter,
  article: articlesRouter,
  banner: bannerRouter,
  reviewArticle: reviewArticlesRouter,
};

module.exports = routers;

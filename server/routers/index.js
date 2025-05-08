const userRouter = require("./user");
const postcardRouter = require("./postcard");
const categoriesRouter = require("./categories");
const articlesRouter = require("./articles");
const bannerRouter = require("./banner");
const reviewArticlesRouter = require("./reviewArticles");
const notificationRouter = require("./notification");
const likeRouter = require("./likes");
const managerRouter = require("./managerUsers");
const questionRouter = require("./questions");
const tagRouter = require("./tags");
const answerRouter = require("./answers");
const questionTagRouter = require("./questionTags");

const routers = {
  user: userRouter,
  postcard: postcardRouter,
  categories: categoriesRouter,
  article: articlesRouter,
  banner: bannerRouter,
  reviewArticle: reviewArticlesRouter,
  notification: notificationRouter,
  like: likeRouter,
  managerUser: managerRouter,
  question: questionRouter,
  tag: tagRouter,
  answer: answerRouter,
  questionTag: questionTagRouter,
};

module.exports = routers;

const userRouter = require("./user");
const postcardRouter = require("./postcard");
const categoriesRouter = require("./categories");

const routers = {
    user: userRouter,
    postcard : postcardRouter,
    categories : categoriesRouter
};

module.exports = routers;

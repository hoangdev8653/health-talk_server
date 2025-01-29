const userRouter = require("./user");
const postcardRouter = require("./postcard");

const routers = {
    user: userRouter,
    postcard : postcardRouter
};

module.exports = routers;

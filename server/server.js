require("dotenv/config");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dbconn = require("./config/dbconnect");
const routers = require("./routers/index");

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

dbconn();

app.use("/user", routers.user);
app.use("/postcard", routers.postcard);
app.use("/categories", routers.categories);
app.use("/article", routers.article);
app.use("/banner", routers.banner);
app.use("/reviewArticle", routers.reviewArticle);
app.use("/notification", routers.notification);
app.use("/like", routers.like);

app.use((req, res, next) => {
  next(createHttpError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

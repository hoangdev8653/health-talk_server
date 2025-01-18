// Sử dụng require thay vì import
require("dotenv/config");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dbconn = require("./config/dbconnect.js"); // Sử dụng require

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

dbconn();

// Các middleware xử lý lỗi
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

// Lắng nghe cổng
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

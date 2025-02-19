const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const validateToken = require("../middlewares/auth");

router.route("/").get(userControllers.getAllUser);
router.route("/dang-ki").post(userControllers.register);
router.route("/dang-nhap").post(userControllers.login);
router.route("/refreshToken").post(userControllers.refreshToken);

module.exports = router;

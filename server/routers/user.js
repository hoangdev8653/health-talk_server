const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user")


router.get("/", userControllers.getAllUser)
router.post("/dang-ki", userControllers.register)
router.post("/dang-nhap", userControllers.login)

module.exports = router;

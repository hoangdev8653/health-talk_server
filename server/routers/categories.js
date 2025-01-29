const express = require("express");
const router = express.Router();
const  uploadCloud  = require("../middlewares/cloudinary");

const categoriesControllers = require("../controllers/categories");

router.route("/").get(categoriesControllers.getAllCategories);
router.route("/create").post(uploadCloud.single("image"),categoriesControllers.createCategories);
router.route("/").get(categoriesControllers.deleteCategories);


module.exports = router;
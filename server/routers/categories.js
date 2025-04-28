const express = require("express");
const router = express.Router();
const uploadCloud = require("../middlewares/cloudinary");

const categoriesControllers = require("../controllers/categories");

router.route("/").get(categoriesControllers.getAllCategories);
router.route("/search/").get(categoriesControllers.getCategoryBykey);
router
  .route("/create")
  .post(uploadCloud.single("image"), categoriesControllers.createCategories);
router
  .route("/update")
  .post(uploadCloud.single("image"), categoriesControllers.updateCategories);
router.route("/delete").delete(categoriesControllers.deleteCategories);

module.exports = router;

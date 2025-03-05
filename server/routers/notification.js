const express = require("express");
const router = express.Router();
const notificationControllers = require("../controllers/notification");
const validateToken = require("../middlewares/auth");

router.route("/").get(notificationControllers.getAllNotification);
router
  .route("/getByUser")
  .get(validateToken, notificationControllers.getNotificationByUser);
router.route("/delete").delete(notificationControllers.deleteNotification);

module.exports = router;

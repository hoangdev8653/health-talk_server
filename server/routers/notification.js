const express = require("express");
const router = express.Router();
const notificationControllers = require("../controllers/notification");
const validateToken = require("../middlewares/auth");

router.route("/").get(notificationControllers.getAllNotification);
router.route("/getById").get(notificationControllers.getNotificationById);
router
  .route("/getByUser")
  .get(validateToken, notificationControllers.getNotificationByUser);
router
  .route("/updateStatus")
  .put(notificationControllers.updateStatusNotification);

router
  .route("/delete")
  .delete(validateToken, notificationControllers.deleteNotification);

module.exports = router;

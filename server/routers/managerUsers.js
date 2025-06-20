const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/auth");
const managerUserController = require("../controllers/managerUser");

router.route("/").get(managerUserController.getAllBlockedUsers);
router.route("/check-block").get(managerUserController.checkIsBlockByUserId);
router.route("/block").post(validateToken, managerUserController.blockUser);
router.route("/unblock").post(validateToken, managerUserController.unblockUser);
router.route("/delete").delete(managerUserController.deleteBlockedUser);

module.exports = router;

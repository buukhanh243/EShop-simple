const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.route("/").get(usersController.getAllUser);
router.route("/register").post(usersController.signUpUser);
router
  .route("/:id")
  .get(usersController.getUserDetail)
  .patch(usersController.editUsers)
  .delete(usersController.deleteUser);
router.route("/login").post(usersController.signInUser);
router.route("/get/count").get(usersController.getCountUsers);

module.exports = router;

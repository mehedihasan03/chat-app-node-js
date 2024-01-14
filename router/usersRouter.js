//external imports
const express = require("express");

// internal imports
const {
  getUsers,
  addUser,
  deleteUser,
} = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidator,
  addUserValidationHandler,
} = require("../middlewares/users/usersValidator");

const router = express.Router();

// users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// add new user
router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidationHandler,
  addUser
);

// delete user
router.delete("/:id", deleteUser);

module.exports = router;

/** @Model****************************************************************
 * generate a Route for User
 * ************************************************************************
 */

const express = require("express");
const UserController = require("../../controllers/User.controller");
const validate = require("../../middlewares/validate");
const UserValidation = require("../../validations/User.validation");

const router = express.Router();
router
  .route("/")
  .get(validate(UserValidation.getUserQuery), UserController.getUserQuery)
  .post(validate(UserValidation.createUser), UserController.createUser);
// user login
router
  .route("/login")
  .post(validate(UserValidation.loginUser), UserController.loginUser);
router
  .route("/:id")
  .get(validate(UserValidation.getUserById), UserController.getUserById)
  .patch(validate(UserValidation.updateUser), UserController.updateUser)
  .delete(validate(UserValidation.deleteUser), UserController.deleteUser);
module.exports = router;

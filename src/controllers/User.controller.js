/** @Model****************************************************************
 * generate a controller for User
 * ************************************************************************
 */

const catchAsync = require("../libs/catchAsync");
const pick = require("../libs/pick");
const UserService = require("../services/User.service");
const httpStatus = require("http-status");
const ApiError = require("../libs/ApiError");
const jwt = require("jsonwebtoken");
class UserController {
  // get the User functions
  static getUserQuery = catchAsync(async (req, res) => {
    /**
     * Query for Mos
     * @param {Object} filter - Mongo filter
     * */
    const filter = pick(req.query, [
      "userName",
      "userShortName",
      "userEmail",
      "userRgDate",
      "userActive",
      "userVerify",
      "userExpiry",
      "loginAttempts",
      "userRollName",
    ]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await UserService.queryUser(filter, options);
    res.json(result);
  });

  // create User function
  static createUser = catchAsync(async (req, res) => {
    const User = await UserService.createUser(req.body);
    res.status(httpStatus.CREATED).send(User);
  });
  static loginUser = catchAsync(async (req, res) => {
    const user = await UserService.loginUser(req.body);
    // delete user.userPassword;
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET);
    res.send({ user, token });
    // res.status(httpStatus.CREATED).send(User);
  });

  // get user by ID
  static getUserById = catchAsync(async (req, res) => {
    const User = await UserService.getUserById(req.params.id);
    if (!User) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    res.send(User);
  });

  // update User
  static updateUser = catchAsync(async (req, res) => {
    const User = await UserService.updateUser(req.params.id, req.body);
    res.send(User);
  });
  // Delete User
  static deleteUser = catchAsync(async (req, res) => {
    await UserService.deleteUser(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
  });
}

module.exports = UserController;

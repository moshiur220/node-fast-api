/** @Model****************************************************************
 * generate a Service for User
 * ************************************************************************
 */
const ApiError = require("../libs/ApiError");
const Pagination = require("../libs/plugins/mongo/Pagination");
const UserModel = require("../models/User.model");
const httpStatus = require("http-status");
const checkDuplicate = require("../libs/plugins/mongo/checkDuplicate");
const bcrypt = require("bcrypt");
class UserService {
  /**
   * Query for users
   * @param {Object} filter - Mongo filter
   * @param {Object} options - Query options
   * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  static async queryUser(filter, options) {
    const User = await Pagination.paginate(UserModel, filter, options);
    return User;
  }

  // user login
  static async loginUser(body) {
    const user = await checkDuplicate(UserModel, { userEmail: body.userEmail });
    if (!user)
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "User email and pass not exist"
      );

    const check = await bcrypt.compareSync(
      body.userPassword,
      user.userPassword
    );
    if (!check)
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Incorrect email or password"
      );
    // delete user.userPassword;
    const sendUser = await UserModel.findOne({
      userEmail: body.userEmail,
    }).select("-userPassword");
    return sendUser;
    //  if(!check) return res.send("Email and password are not match")
  }
  // Create a new User
  static async createUser(body) {
    const salt = bcrypt.genSaltSync(10);
    body.userPassword = bcrypt.hashSync(body.userPassword, salt);
    if (await checkDuplicate(UserModel, { userEmail: body.userEmail })) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    return UserModel.create(body);
  }
  // get User by id
  static async getUserById(id) {
    return UserModel.findById(id);
  }
  // User update
  static async updateUser(id, body) {
    const User = await this.getUserById(id);
    if (!User) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    return UserModel.findByIdAndUpdate(id, body);
  }

  static async deleteUser(id) {
    const User = await this.getUserById(id);
    if (!User) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    await User.remove();
    return User;
  }
}

module.exports = UserService;

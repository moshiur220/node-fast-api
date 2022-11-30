/** @Model****************************************************************
 * generate a model for mongo schema
 * ************************************************************************
 */

const mongoose = require("mongoose");
const { paginate, toJSON } = require("../libs/plugins");

// create schema for User
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    userShortName: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    userRgDate: {
      type: Date,
      default: new Date(),
    },
    userUrl: {
      type: String,
    },
    userActive: {
      type: Boolean,
      default: true,
    },
    userImage: {
      type: String,
    },
    userVerify: {
      type: Boolean,
      default: true,
    },
    userPassword: {
      type: String,
    },
    userExpiry: {
      type: Date,
    },
    loginAttempts: {
      type: Number,
    },
    userToken: {
      type: String,
    },
    userRollName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
UserSchema.plugin(toJSON);

const UserMode = mongoose.model("User", UserSchema);
module.exports = UserMode;

/** @Model****************************************************************
 * generate a Route for User
 * ************************************************************************
 */

const Joi = require("joi");
const { objectId } = require("./custom.validation");
const createUser = {
  /* Declare your field property */

  body: Joi.object().keys({
    userName: Joi.string().required(),
    userShortName: Joi.string().required(),
    userEmail: Joi.string().email().required(),
    userPassword: Joi.string().required(),
  }),
};
const loginUser = {
  /* Declare your field property */

  body: Joi.object().keys({
    userEmail: Joi.string().email().required(),
    userPassword: Joi.string().required(),
  }),
};

const getUserQuery = {
  /* Declare your field property */
  query: Joi.object().keys({
    userName: Joi.string(),
    userShortName: Joi.string(),
    userEmail: Joi.string().email(),
    userRgDate: Joi.date(),
    userActive: Joi.boolean(),
    userVerify: Joi.boolean(),
    userExpiry: Joi.date(),
    loginAttempts: Joi.number(),
    userRollName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUserById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

/* Declare your field property */

const updateUser = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userName: Joi.string(),
      userShortName: Joi.string(),
      userEmail: Joi.string().email(),
      userRgDate: Joi.date(),
      userActive: Joi.boolean(),
      userVerify: Joi.boolean(),
      userExpiry: Joi.date(),
      loginAttempts: Joi.number(),
      userRollName: Joi.string(),
    })
    .min(1),
};
const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUserQuery,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};

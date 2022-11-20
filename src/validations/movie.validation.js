const Joi = require("joi");
const createMovie = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    releaseYear: Joi.string().required(),
    length: Joi.number().required(),
    rating: Joi.number().required(),
  }),
};

const getMovieQuery = {
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    releaseYear: Joi.string(),
    length: Joi.number(),
    rating: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createMovie,
  getMovieQuery,
};

const express = require("express");

const MovieController = require("../../controllers/movie.controller");
const validate = require("../../middlewares/validate");
const movieMode = require("../../models/movie.model");
const movieValidation = require("../../validations/movie.validation");

const router = express.Router();
// router.route("/").get(MovieController.getAllUser);
router
  .route("/")
  .get(validate(movieValidation.getMovieQuery), MovieController.getMovieQuery)
  .post(validate(movieValidation.createMovie), MovieController.createMovie);
router
  .route("/:id")
  .get(validate(movieValidation.getMovieById), MovieController.getMovieById)
  .patch(validate(movieValidation.updateMovie), MovieController.updateMovie)
  .delete(validate(movieValidation.deleteMovie), MovieController.deleteMovie);
module.exports = router;

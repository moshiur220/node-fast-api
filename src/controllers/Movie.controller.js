const catchAsync = require("../libs/catchAsync");
const pick = require("../libs/pick");
const movieMode = require("../models/movie.model");
const MovieService = require("../services/Move.service");
const httpStatus = require("http-status");
class MovieController {
  // get the movie functions
  static getMovieQuery = catchAsync(async (req, res) => {
    const filter = pick(req.query, [
      "title",
      "description",
      "releaseYear",
      "length",
      "rating",
    ]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await MovieService.queryMovie(filter, options);
    res.json(result);
  });

  // create movie function
  static createMovie = catchAsync(async (req, res) => {
    const movie = await MovieService.createMovie(req.body);
    res.status(httpStatus.CREATED).send(movie);
  });
}

module.exports = MovieController;

const catchAsync = require("../libs/catchAsync");
const pick = require("../libs/pick");
const MovieService = require("../services/Move.service");
const httpStatus = require("http-status");
const ApiError = require("../libs/ApiError");
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

  // get user by ID
  static getMovieById = catchAsync(async (req, res) => {
    const movie = await MovieService.getMovieById(req.params.id);
    if (!movie) {
      throw new ApiError(httpStatus.NOT_FOUND, "movie not found");
    }
    res.send(movie);
  });

  // update movie
  static updateMovie = catchAsync(async (req, res) => {
    const movie = await MovieService.updateMovie(req.params.id, req.body);
    res.send(movie);
  });
  // Delete movie
  static deleteMovie = catchAsync(async (req, res) => {
    await MovieService.deleteMovie(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
  });
}

module.exports = MovieController;

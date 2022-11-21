const ApiError = require("../libs/ApiError");
const Pagination = require("../libs/plugins/mongo/Pagination");
const movieMode = require("../models/movie.model");
const httpStatus = require("http-status");
class MovieService {
  static async queryMovie(filter, options) {
    const movie = await Pagination.paginate(movieMode, filter, options);
    return movie;
  }
  // Create a new movie
  static async createMovie(body) {
    return movieMode.create(body);
  }
  // get movie by id
  static async getMovieById(id) {
    return movieMode.findById(id);
  }
  // movie update
  static async updateMovie(id, body) {
    const movie = await this.getMovieById(id);
    if (!movie) throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");
    return movieMode.findByIdAndUpdate(id, body);
  }

  static async deleteMovie(id) {
    const movie = await this.getMovieById(id);
    if (!movie) throw new ApiError(httpStatus.NOT_FOUND, "Movie not found");
    await movie.remove();
    return movie;
  }
}

module.exports = MovieService;

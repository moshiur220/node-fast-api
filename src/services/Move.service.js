const Pagination = require("../libs/plugins/mongo/Pagination");
const movieMode = require("../models/movie.model");

class MovieService {
  static async queryMovie(filter, options) {
    // const movie = await movieMode.aggregate(filter, options);
    const movie = await Pagination.paginate(movieMode, filter, options);

    return movie;
  }
}

module.exports = MovieService;

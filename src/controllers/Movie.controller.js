const pick = require("../libs/pick");
const movieMode = require("../models/movie.model");
const MovieService = require("../services/Move.service");

class MovieController {
  static async getAllUser(req, res) {
    const filter = pick(req.query, [
      "title",
      "description",
      "releaseYear",
      "length",
      "rating",
    ]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    console.log(options);
    const result = await MovieService.queryMovie(filter, options);
    // const result = await movieMode.find(filter).sort(testQuery(options));
    // console.log(testQuery(options));
    console.log(result);
    res.json(result);
  }
}

function testQuery(options) {
  let sort = {};
  // new sort database
  if (options.sortBy) {
    const sortingCriteria = [];
    options.sortBy.split(",").forEach((sortOption) => {
      // const [key, order] = sortOption.split(":");
      const [key, order] = sortOption.split(":");
      // sortingCriteria.push((order === "desc" ? "-" : "") + key);
      if (order === "desc") {
        sort[key] = -1;
      } else {
        sort[key] = 1;
      }
    });
    // sort = sortingCriteria.join(" ");
  } else {
    // sort = "createdAt";
    sort["createdAt"] = -1;
  }
  return sort;
}

module.exports = MovieController;

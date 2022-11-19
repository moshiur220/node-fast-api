const mongoose = require("mongoose");
const { paginate, toJSON } = require("../libs/plugins");

// create schema for user
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  releaseYear: {
    type: String,
  },
  length: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
});

// add plugin that converts mongoose to json
movieSchema.plugin(toJSON);
movieSchema.plugin(paginate);

const movieMode = mongoose.model("movie", movieSchema);
module.exports = movieMode;

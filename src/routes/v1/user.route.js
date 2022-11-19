const express = require("express");

const MovieController = require("../../controllers/movie.controller");
const movieMode = require("../../models/movie.model");

const router = express.Router();
// router.route("/").get(MovieController.getAllUser);
router.route("/").get(MovieController.getAllUser);
module.exports = router;

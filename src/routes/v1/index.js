const express = require("express");
const movieRoute = require("./movie.route");
const userRoute = require("./User.route");
const router = express.Router();

const defaultRoutes = [
  //   {
  //     path: '/auth',
  //     route: authRoute,
  //   },
  {
    path: "/movies",
    route: movieRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

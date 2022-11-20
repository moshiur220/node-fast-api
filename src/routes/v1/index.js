const express = require("express");
const userRoute = require("./movie.route");
const router = express.Router();

const defaultRoutes = [
  //   {
  //     path: '/auth',
  //     route: authRoute,
  //   },
  {
    path: "/movies",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

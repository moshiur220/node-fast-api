const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const createError = require("http-errors");
const morgan = require("morgan");
const routes = require("./routes/v1");
const app = express();
const { expressjwt: jwt } = require("express-jwt");
const jwksClient = require("jwks-rsa");
app.use(express.static("src/public"));
app.use(morgan("dev"));
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// Here is configration auth jwt
app.use(
  jwt({
    secret: jwksClient.expressJwtSecret({
      jwksUri: "http://localhost:3000/.well-know/jwks.json",
      cache: true,
      rateLimit: true,
    }),
    algorithms: ["RS256"],
  }).unless({
    path: ["/", "/v1/users/login"],
  })
);

// version V1 router is here
app.use("/v1", routes);
// teat api endpoint
app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

// if api not found show error message router
app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});
module.exports = app;

const { expressjwt: jwt } = require("express-jwt");
const jwksClient = require("jwks-rsa");
function jwtVerification(req, res, next) {
  return jwt({
    secret: jwksClient.expressJwtSecret({
      jwksUri: "http://localhost:3000/.well-know/jwks.json",
      cache: true,
      rateLimit: true,
    }),
    algorithms: ["RS256"],
  }).unless({
    path: ["/", "/v1/users/login"],
  });
}
module.exports = jwtVerification;

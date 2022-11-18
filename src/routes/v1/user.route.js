const express = require("express");

const router = express.Router();
router.get("/", (req, res) => {
  const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = object[key];
      }
      return obj;
    }, {});
  };

  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  console.log(req.query);
  console.log(filter);
  res.send("hello");
});

module.exports = router;

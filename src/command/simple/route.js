function generateRoute(name) {
  return `
/** @Model****************************************************************
 * generate a Route for ${name}  
 * ************************************************************************
*/   
const express = require("express");
const ${name}Controller = require("../../controllers/${name}.controller");
const validate = require("../../middlewares/validate");
const ${name}Validation = require("../../validations/${name}.validation");

const router = express.Router();
router
  .route("/")
  .get(validate(${name}Validation.get${name}Query), ${name}Controller.get${name}Query)
  .post(validate(${name}Validation.create${name}), ${name}Controller.create${name});
router
  .route("/:id")
  .get(validate(${name}Validation.get${name}ById), ${name}Controller.get${name}ById)
  .patch(validate(${name}Validation.update${name}), ${name}Controller.update${name})
  .delete(validate(${name}Validation.delete${name}), ${name}Controller.delete${name});
module.exports = router;
    `;
}

module.exports = generateRoute;

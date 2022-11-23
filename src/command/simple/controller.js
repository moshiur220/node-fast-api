function generateController(name) {
  return `
/** @Model****************************************************************
 * generate a controller for ${name}  
 * ************************************************************************
*/ 
const catchAsync = require("../libs/catchAsync");
const pick = require("../libs/pick");
const ${name}Service = require("../services/${name}.service");
const httpStatus = require("http-status");
const ApiError = require("../libs/ApiError");
class ${name}Controller {
  // get the ${name} functions
  static get${name}Query = catchAsync(async (req, res) => {
  /**
 * Query for Mos
 * @param {Object} filter - Mongo filter
 * */
    const filter = pick(req.query, [

    ]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await ${name}Service.query${name}(filter, options);
    res.json(result);
  });

  // create ${name} function
  static create${name} = catchAsync(async (req, res) => {
    const ${name} = await ${name}Service.create${name}(req.body);
    res.status(httpStatus.CREATED).send(${name});
  });

  // get user by ID
  static get${name}ById = catchAsync(async (req, res) => {
    const ${name} = await ${name}Service.get${name}ById(req.params.id);
    if (!${name}) {
      throw new ApiError(httpStatus.NOT_FOUND, "${name} not found");
    }
    res.send(${name});
  });

  // update ${name}
  static update${name} = catchAsync(async (req, res) => {
    const ${name} = await ${name}Service.update${name}(req.params.id, req.body);
    res.send(${name});
  });
  // Delete ${name}
  static delete${name} = catchAsync(async (req, res) => {
    await ${name}Service.delete${name}(req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
  });
}

module.exports = ${name}Controller;
`;
}
module.exports = generateController;

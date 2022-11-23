function generateService(name) {
  return `
/** @Model****************************************************************
 * generate a Service for ${name}  
 * ************************************************************************
*/
const ApiError = require("../libs/ApiError");
const Pagination = require("../libs/plugins/mongo/Pagination");
const ${name}Model = require("../models/${name}.model");
const httpStatus = require("http-status");
class ${name}Service {
    /**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
  static async query${name}(filter, options) {
    const ${name} = await Pagination.paginate(${name}Model, filter, options);
    return ${name};
  }
  // Create a new ${name}
  static async create${name}(body) {
    return ${name}Model.create(body);
  }
  // get ${name} by id
  static async get${name}ById(id) {
    return ${name}Model.findById(id);
  }
  // ${name} update
  static async update${name}(id, body) {
    const ${name} = await this.get${name}ById(id);
    if (!${name}) throw new ApiError(httpStatus.NOT_FOUND, "${name} not found");
    return ${name}Model.findByIdAndUpdate(id, body);
  }

  static async delete${name}(id) {
    const ${name} = await this.get${name}ById(id);
    if (!${name}) throw new ApiError(httpStatus.NOT_FOUND, "${name} not found");
    await ${name}.remove();
    return ${name};
  }
}

module.exports = ${name}Service;

    `;
}

module.exports = generateService;

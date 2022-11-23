function generateModel(name) {
  return `
/** @Model****************************************************************
 * generate a model for mongo schema 
 * ************************************************************************
*/    
const mongoose = require("mongoose");
const { paginate, toJSON } = require("../libs/plugins");

// create schema for ${name}
const ${name}Schema = new mongoose.Schema({
  title: {
    type: String,
  },
});

// add plugin that converts mongoose to json
${name}Schema.plugin(toJSON);


const ${name}Mode = mongoose.model("${name}", ${name}Schema);
module.exports = ${name}Mode;

    `;
}

module.exports = generateModel;

function generateValidation(name) {
  return `
/** @Model****************************************************************
 * generate a Route for ${name}  
 * ************************************************************************
*/      
const Joi = require("joi");
const { objectId } = require("./custom.validation");
const create${name} = {
/* Declare your field property */  
  body: Joi.object().keys({
  
  }),
};

const get${name}Query = {
/* Declare your field property */      
  query: Joi.object().keys({

    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const get${name}ById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

/* Declare your field property */  
const update${name} = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({

    })
    .min(1),
};
const delete${name} = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  create${name},
  get${name}Query,
  get${name}ById,
  update${name},
  delete${name},
};

    `;
}

module.exports = generateValidation;
